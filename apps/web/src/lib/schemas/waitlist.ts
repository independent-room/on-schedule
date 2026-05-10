import { z } from 'zod';

export const INDUSTRIES = [
  'bakery',
  'dessert',
  'cafe',
  'beauty',
  'tattoo',
  'oneday_class',
  'other',
] as const;

export type Industry = (typeof INDUSTRIES)[number];

const phoneSchema = z
  .string()
  .regex(/^\d{11}$/, '11자리 숫자만 입력해주세요')
  .refine((v) => !v.startsWith('050'), '안심번호는 알림톡 수신이 안 됩니다');

export const waitlistInputSchema = z.object({
  email: z.string().email(),
  industry: z.enum(INDUSTRIES),
  phone: phoneSchema.optional(),
  privacy_consent: z.literal(true, {
    errorMap: () => ({ message: '개인정보처리방침 동의가 필요합니다 (PIPA)' }),
  }),
  marketing_consent: z.literal(true, {
    errorMap: () => ({ message: '출시 알림 수신 동의가 필요합니다 (정보통신망법)' }),
  }),
  interview_consent: z.boolean().optional(),
});

export type WaitlistInput = z.infer<typeof waitlistInputSchema>;
