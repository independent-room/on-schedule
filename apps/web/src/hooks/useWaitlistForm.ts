'use client';

import { useState } from 'react';
import { submitWaitlist, type WaitlistResult } from '@/actions/waitlist';
import type { WaitlistInput } from '@/lib/schemas/waitlist';

export type WaitlistStatus =
  | 'idle'
  | 'success'
  | {
      kind: 'error';
      code: Extract<WaitlistResult, { ok: false }>['code'];
      message: string;
    };

export function useWaitlistForm() {
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const [isPending, setIsPending] = useState(false);

  async function submit(input: WaitlistInput) {
    setIsPending(true);
    try {
      const result = await submitWaitlist(input);
      if (result.ok) {
        setStatus('success');
      } else {
        setStatus({
          kind: 'error',
          code: result.code,
          message: result.error,
        });
      }
    } catch (e) {
      setStatus({
        kind: 'error',
        code: 'database',
        message: e instanceof Error ? e.message : '알 수 없는 오류',
      });
    } finally {
      setIsPending(false);
    }
  }

  function reset() {
    setStatus('idle');
  }

  return { status, isPending, submit, reset };
}
