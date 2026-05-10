import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

vi.mock('@/actions/waitlist', () => ({
  submitWaitlist: vi.fn(),
}));

import { submitWaitlist } from '@/actions/waitlist';
import { useWaitlistForm } from './useWaitlistForm';
import type { WaitlistInput } from '@/lib/schemas/waitlist';

const VALID_INPUT: WaitlistInput = {
  email: 'sajangnim@bakery.com',
  industry: 'bakery',
  privacy_consent: true,
  marketing_consent: true,
};

describe('useWaitlistForm', () => {
  beforeEach(() => {
    vi.mocked(submitWaitlist).mockReset();
  });

  it('starts in idle status', () => {
    const { result } = renderHook(() => useWaitlistForm());
    expect(result.current.status).toBe('idle');
    expect(result.current.isPending).toBe(false);
  });

  it('transitions to success when the action succeeds', async () => {
    vi.mocked(submitWaitlist).mockResolvedValue({ ok: true });
    const { result } = renderHook(() => useWaitlistForm());

    await act(async () => {
      await result.current.submit(VALID_INPUT);
    });

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('transitions to error when the action returns ok:false', async () => {
    vi.mocked(submitWaitlist).mockResolvedValue({
      ok: false,
      code: 'duplicate',
      error: '이미 사전 신청하신 이메일입니다',
    });
    const { result } = renderHook(() => useWaitlistForm());

    await act(async () => {
      await result.current.submit(VALID_INPUT);
    });

    await waitFor(() => {
      expect(result.current.status).toEqual({
        kind: 'error',
        code: 'duplicate',
        message: '이미 사전 신청하신 이메일입니다',
      });
    });
  });

  it('forwards the input verbatim to submitWaitlist', async () => {
    vi.mocked(submitWaitlist).mockResolvedValue({ ok: true });
    const { result } = renderHook(() => useWaitlistForm());

    const inputWithOptional: WaitlistInput = {
      ...VALID_INPUT,
      phone: '01012345678',
      interview_consent: true,
    };

    await act(async () => {
      await result.current.submit(inputWithOptional);
    });

    expect(submitWaitlist).toHaveBeenCalledTimes(1);
    expect(submitWaitlist).toHaveBeenCalledWith(inputWithOptional);
  });

  it('reset() returns status back to idle after a result', async () => {
    vi.mocked(submitWaitlist).mockResolvedValue({ ok: true });
    const { result } = renderHook(() => useWaitlistForm());

    await act(async () => {
      await result.current.submit(VALID_INPUT);
    });
    await waitFor(() => expect(result.current.status).toBe('success'));

    act(() => result.current.reset());
    expect(result.current.status).toBe('idle');
  });

  it('catches thrown exceptions from the action and surfaces an error status', async () => {
    vi.mocked(submitWaitlist).mockRejectedValue(new Error('network down'));
    const { result } = renderHook(() => useWaitlistForm());

    await act(async () => {
      await result.current.submit(VALID_INPUT);
    });

    await waitFor(() => {
      const status = result.current.status;
      expect(typeof status).toBe('object');
      if (typeof status === 'object' && status.kind === 'error') {
        expect(status.code).toBe('database');
      } else {
        throw new Error('expected error status');
      }
    });
  });
});
