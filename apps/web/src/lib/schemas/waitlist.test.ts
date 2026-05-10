import { describe, it, expect } from 'vitest';
import { waitlistInputSchema, INDUSTRIES } from './waitlist';

describe('waitlistInputSchema', () => {
  const validInput = {
    email: 'sajangnim@bakery.com',
    industry: 'bakery' as const,
    privacy_consent: true,
    marketing_consent: true,
  };

  it('accepts a minimal valid input', () => {
    const result = waitlistInputSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('accepts optional phone and interview_consent', () => {
    const result = waitlistInputSchema.safeParse({
      ...validInput,
      phone: '01012345678',
      interview_consent: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing email', () => {
    const { email, ...rest } = validInput;
    const result = waitlistInputSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('rejects invalid email format', () => {
    const result = waitlistInputSchema.safeParse({
      ...validInput,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects industry outside the allowed enum', () => {
    const result = waitlistInputSchema.safeParse({
      ...validInput,
      industry: 'restaurant', // 17.설계서에 없는 업종
    });
    expect(result.success).toBe(false);
  });

  it('rejects privacy_consent=false (PIPA 필수)', () => {
    const result = waitlistInputSchema.safeParse({
      ...validInput,
      privacy_consent: false,
    });
    expect(result.success).toBe(false);
  });

  it('rejects marketing_consent=false (정보통신망법 출시 알림 동의 필수)', () => {
    const result = waitlistInputSchema.safeParse({
      ...validInput,
      marketing_consent: false,
    });
    expect(result.success).toBe(false);
  });

  it('rejects phone with non-digit characters', () => {
    const result = waitlistInputSchema.safeParse({
      ...validInput,
      phone: '010-1234-5678', // 정규화 전. 하이픈 X, 숫자만 11자리
    });
    expect(result.success).toBe(false);
  });

  it('rejects phone shorter than 11 digits', () => {
    const result = waitlistInputSchema.safeParse({
      ...validInput,
      phone: '0101234567', // 10자리
    });
    expect(result.success).toBe(false);
  });

  it('rejects phone starting with 050 (안심번호 - 알림톡 수신 불가)', () => {
    const result = waitlistInputSchema.safeParse({
      ...validInput,
      phone: '05012345678',
    });
    expect(result.success).toBe(false);
  });

  it('exposes INDUSTRIES constant matching the schema enum', () => {
    expect(INDUSTRIES).toEqual([
      'bakery',
      'dessert',
      'cafe',
      'beauty',
      'tattoo',
      'oneday_class',
      'other',
    ]);
  });
});
