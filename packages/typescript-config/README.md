# @on-schedule/tsconfig

온스케줄 모노레포 전체에서 공유하는 TypeScript 설정 프리셋 5종.

## 사용법

각 워크스페이스의 `tsconfig.json`에서 extends:

### apps/api (NestJS)
```json
{
  "extends": "@on-schedule/tsconfig/nestjs.json",
  "compilerOptions": {
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src/**/*"]
}
```

### apps/web (Next.js 15)
```json
{
  "extends": "@on-schedule/tsconfig/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", ".next/types/**/*.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### apps/mobile (Expo)
```json
{
  "extends": "@on-schedule/tsconfig/expo.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### packages/shared, packages/api-client (라이브러리)
```json
{
  "extends": "@on-schedule/tsconfig/library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

## 프리셋 차이 요약

| 프리셋 | 모듈 | 컴파일 출력 | 데코레이터 | JSX | 비고 |
|---|---|---|---|---|---|
| `base.json` | ESNext | (오버라이드) | ❌ | ❌ | 모든 프리셋의 공통 부모 |
| `nestjs.json` | CommonJS | dist/ | ✅ (experimental + emit metadata) | ❌ | NestJS 표준 |
| `nextjs.json` | ESNext | noEmit (Next 빌더가 처리) | ❌ | preserve | App Router + Server Components |
| `expo.json` | ESNext | noEmit (Metro가 처리) | ❌ | react-native | RN + Expo |
| `library.json` | ESNext | dist/ + .d.ts | ❌ | ❌ | packages/* 출력용. **단 우리는 TS source 직접 import 정책이라 사실상 noEmit 가능** |

## 정책 메모

- **packages/* 빌드 정책**: ADR-0004에 따라 TS source 직접 import (`"main": "./src/index.ts"`). `library.json`은 추후 외부 publish 시점에 사용. 베타엔 빌드 불필요.
- **`noUncheckedIndexedAccess`**: `base.json`에서 `true` (안전), `nestjs.json`에서 `false` 오버라이드 (보일러플레이트 호환).
- **`strictPropertyInitialization`**: NestJS는 `false` (DI 컨테이너가 채움).
