# ADR-0015: 트래픽 폭증 대응 — 단계적 접근

상태: 채택
일자: 2026-05-05

## 컨텍스트

베이커리/디저트 업종은 트래픽 폭증 가능성이 실재한다. 인기 매장(노티드·누데이크·도쿄바나나급)의 한정 케이크 오픈 시 5분 안에 동시 1,000~5,000명 접속 가능. 베타 5곳 중 인기 매장이 1곳이라도 들어오면 월 1-2회 폭증 발생 가능.

폭증 못 견디면 사장님 신뢰 박살 → 사용자 이탈 → 입소문 부정 → 사업 신뢰 손실.

제약:
- 1인 운영 — 24/7 대응 불가
- 비용 최소화 1순위 (사용자 명시)
- Railway Hobby ($15-25/월) 채택 — 자동 vertical scaling은 가능하나 horizontal 폭증엔 한계
- AWS Waiting Room API는 셋업 부담 (CDK template + Lambda + DynamoDB)
- Cloudflare Waiting Room은 Business plan ($200/월) 필요 — 베타 비현실
- 자체 구현은 디테일(페어니스, 토큰 만료, 어뷰징) 빠지기 쉬움

## 검토한 옵션

### 폭증 대응 솔루션 비교
| 솔루션 | 비용 | 구현 부담 | 매장별 분리 | 1인 적합 |
|---|---|---|---|---|
| **Application layer (BullMQ + 캐싱 + Rate limiting)** | $0 | 본 개발에 포함 | 🟢 (코드로) | 🟢 |
| **Queue-Fair Free** (Cloudflare Workers) | $0 (CF Workers Free) | 1-2일 셋업 | 🟢 | 🟢 |
| 자체 구현 (Vercel Edge + KV) | $0 | 1-2주 | 🟢 | 🟠 |
| 자체 구현 (NestJS + Redis 큐 + SSE) | $0 추가 | 5-7일 | 🟢 | 🟠 |
| Cloudflare Waiting Room Business | $200/월 | 1일 | ❌ (Enterprise만) | 🔴 베타 비현실 |
| Cloudflare Waiting Room Enterprise | $1000+/월 | 1일 | 🟢 | 🔴 |
| AWS Waiting Room API | $20-200/월 | 1-2일 (CDK) | 🟢 | 🔴 |
| Queue-it (전문 SaaS) | $500+/월 | 🟢 | 🟢🟢🟢 | 🔴 |

### 옵션별 처리 한계
| 옵션 | 동시 처리 한계 |
|---|---|
| Application layer만 | ~200-500명 |
| + Queue-Fair Free | ~5000+명 |
| + Cloudflare Business | 무한 (단일 큐) |
| + Cloudflare Enterprise | 무한 (매장별 분리) |

## 결정

**3단계 진화 경로 채택.** 한 번에 다 만들지 않고, 각 단계는 직전 단계 한계가 명확해진 시점에 도입.

| Phase | 메커니즘 | 도입 시점 | 비용 |
|---|---|---|---|
| **Phase 1 (현재 ~ 베타)** | **Application layer 견고히** (BullMQ + 캐싱 + Rate limiting + DB transaction 격리) | 즉시 | $0 |
| **Phase 2 (인기 매장 발생 시)** | **Queue-Fair Free** (Cloudflare Workers 무료 활용) | 베타 1곳이 동시 500명+ 발생 시 | $0 |
| **Phase 3 (PMF, 매장 20곳+)** | **Cloudflare Business + Premium 플랜 옵션료** | 매장 20곳+ 도달 또는 폭증 매장 비율 30%+ | $200/월 (매장 옵션료로 회수) |

## Phase 1 구현 (필수 — 베타에 처음부터)

### 1. Rate Limiting (NestJS 데코레이터)
```typescript
@Throttle({ default: { limit: 100, ttl: 60000 } })  // 매장별 분당 100건
@Controller('reservations')
export class ReservationController { ... }
```

### 2. 큐 기반 비동기 처리 (BullMQ)
```typescript
@Process({ concurrency: 10 })
async processReservation(job: Job<ReservationDto>) {
  // 알림톡 발송, 확정 처리 등 비동기
}
```

### 3. Read 캐싱 (Redis)
```typescript
@CacheKey('menu')
@CacheTTL(60)  // 메뉴는 60초 캐싱 → DB 부하 ↓
async getMenu(storeId: string) { ... }
```

### 4. DB 트랜잭션 격리 (재고 race condition 방지)
```typescript
async createReservation(dto) {
  return this.prisma.$transaction(async (tx) => {
    // SELECT FOR UPDATE 락
    // 재고 확인 → 차감
  });
}
```

### 처리 한계
- Application layer만으로 동시 200-500명까지 견딤
- 베타 5곳이 인기 매장 1곳 있어도 폭증 1회당 ~500명까지 OK

## Phase 2 구현 (Queue-Fair Free 도입)

### 트리거
- 베타 매장 1곳이 동시 500명+ 폭증 1회 이상 발생
- 또는 사장님이 "케이크 오픈 시 사이트 멈춤" 피드백

### 셋업
- Cloudflare Workers Free tier (100K 요청/일)
- Queue-Fair `cloudflare` 라이브러리 fork (GitHub: Queue-Fair/cloudflare)
- 매장별 큐 분리 가능
- 1-2일 셋업

### 비용
- Cloudflare Workers Free 안에서 처리 → $0

## Phase 3 구현 (PMF 후, 매장 20곳+)

### 트리거
- 매장 20곳+ 도달 (Cloudflare Business $200/월을 매장당 $10 옵션료로 회수 가능)
- 또는 폭증 빈도 주 1회 이상

### 옵션 1: Cloudflare Business + 단일 큐
- $200/월
- 모든 매장 한 큐 공유 — 매장 A 폭증 시 매장 B 손님도 대기
- Premium 플랜 옵션료 ($10-15/월 추가)로 회수: 매장 20곳 × $10 = $200 회수

### 옵션 2: Cloudflare Enterprise + 매장별 큐
- $1,000+/월 (협상)
- 매장별 큐 완전 분리
- 매장 100곳+ 시점 검토

### 비즈니스 모델 통합
- 기본 플랜 (월 3-5만원): 대기 시스템 X
- **Premium 플랜 (+1-2만원/월): 대기 시스템 옵션 활성**
- 인기 매장만 옵션 가입 → 우리 비용 회수

## 근거

### Application layer 우선 이유
- 외부 솔루션 없이도 동시 200-500명까진 견딤 (베타 5곳 충분)
- Phase 1 구현은 본 개발에 포함되므로 추가 시간 0
- 베이커리 동네 매장은 폭증 거의 없음 (60% 확률)

### Queue-Fair Free Phase 2 채택 이유
- Cloudflare Workers 무료 tier에서 처리 → $0 유지
- 매장별 큐 분리 가능
- 셋업 1-2일 (자체 구현 1-2주 대비 압도적)
- Cloudflare Business $200/월 도입 전 brigde 솔루션

### AWS Waiting Room API 비채택 이유
- CDK template + Lambda + DynamoDB + CloudFront 셋업 부담 (1-2일 + 운영 학습)
- 1인 운영자에게 무거움
- Cloudflare Workers + Queue-Fair Free가 동등 효과 + 단순

### Cloudflare Business 즉시 도입 비채택 이유
- $200/월 = 매장 20곳 모이기 전엔 적자
- 매장 5곳 베타에 과투자
- Phase 3 (매장 20곳+) 시점에 Premium 옵션료로 회수 가능

### Cloudflare Enterprise 비채택 (베타·PMF 단계)
- $1,000+/월 = 매장 100곳+ 시점에야 회수 가능
- 베타·초기 PMF엔 과투자

## 결과

### 베타 단계 (Phase 1) 즉시 액션
- NestJS BullMQ 큐 셋업 (Redis Railway add-on)
- Read 캐싱 패턴 정립 (메뉴·매장 정보 60초 캐싱)
- Rate limiting 매장별 분당 100건 디폴트
- DB transaction 격리 (Prisma `$transaction` + SELECT FOR UPDATE)
- Sentry로 폭증 모니터링 (response time 1초 초과 알림)

### 모니터링 지표 (Phase 2 트리거 감지)
- 매장별 동시 요청 peak (Sentry custom metric)
- API 응답 시간 95th percentile
- DB connection pool 사용률
- BullMQ queue length

### Phase 2 발동 조건 (구체)
- 매장 1곳이 동시 요청 500+ 1회 이상
- 또는 응답 시간 95th > 3초 발생
- → Queue-Fair Free 셋업 1-2일 작업 시작

### Phase 3 발동 조건 (구체)
- 매장 유료 가입 20곳 도달
- 또는 폭증 발생 빈도 주 1회 이상
- → Cloudflare Business 구독 + Premium 플랜 옵션료 비즈니스 모델 도입

### 재검토 트리거
- 폭증 시나리오가 실제 발생 안 함 (베타 6개월 + 매장 50곳 동안 0회) → 폭증 대응 우선순위 하향
- AWS 마이그레이션 시 (PMF 후) → AWS Waiting Room API 재검토 (이미 AWS 학습된 상태에서)
- Queue-it 같은 전문 SaaS가 한국 시장에 합리적 가격으로 진출 시 재검토
