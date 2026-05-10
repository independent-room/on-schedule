import { createClient } from '@supabase/supabase-js';

// 검증 단계엔 인증 흐름이 없으므로 service_role admin client 1개만 필요.
// Server Action에서만 import한다 (NEXT_PUBLIC_ prefix 없는 키 사용 = 자동으로 클라이언트 노출 차단).
//
// 인증 도입 시점(PMF 후)에 createBrowserClient/createServerClient를 별도 파일로 추가.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  throw new Error(
    'Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY. apps/web/.env.local 확인.',
  );
}

export const supabaseAdmin = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
