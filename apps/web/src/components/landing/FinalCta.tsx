'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@on-schedule/ui/components/ui/button';
import { Input } from '@on-schedule/ui/components/ui/input';
import { Label } from '@on-schedule/ui/components/ui/label';
import { Checkbox } from '@on-schedule/ui/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@on-schedule/ui/components/ui/select';
import { useWaitlistForm } from '@/hooks/useWaitlistForm';
import {
  INDUSTRIES,
  type Industry,
  type WaitlistInput,
} from '@/lib/schemas/waitlist';

const INDUSTRY_LABELS: Record<Industry, string> = {
  bakery: '베이커리',
  dessert: '디저트',
  cafe: '카페',
  beauty: '뷰티',
  tattoo: '타투 / 반영구',
  oneday_class: '원데이클래스',
  other: '기타',
};

export function FinalCta() {
  const router = useRouter();
  const { submit, status, isPending } = useWaitlistForm();

  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState<Industry | ''>('');
  const [phone, setPhone] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!industry) return;
    const input: WaitlistInput = {
      email,
      industry,
      privacy_consent: privacyConsent as true,
      marketing_consent: marketingConsent as true,
      ...(phone ? { phone } : {}),
    };
    await submit(input);
  }

  // 제출 성공 시 thank-you로 이동 (이메일을 query param으로 전달 — 인터뷰 신청 시 식별용)
  if (status === 'success') {
    router.push(`/thank-you?email=${encodeURIComponent(email)}`);
  }

  const errorMessage =
    typeof status === 'object' && status.kind === 'error' ? status.message : null;

  return (
    <section id="signup" className="bg-foreground py-20 text-white md:py-28">
      <div className="mx-auto max-w-[680px] px-6">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full bg-brand-500 px-3 py-1.5 text-[12px] font-bold tracking-wider text-white">
            지금 사전 신청
          </span>
          <h2 className="mb-4 font-display text-h2 font-extrabold text-cream-100 md:text-[36px]">
            지금 사전 신청하고 <span className="text-brand-500">1순위</span>로 받아보세요
          </h2>
          <p className="text-body-l text-cream-100/70">
            30초면 끝. 카드 등록 없음.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-7 text-foreground md:p-9"
        >
          {/* 이메일 */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-body-s font-bold">
              이메일 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sajangnim@bakery.com"
              className="h-12 text-body"
            />
          </div>

          {/* 업종 */}
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-body-s font-bold">
              업종 <span className="text-destructive">*</span>
            </Label>
            <Select
              value={industry}
              onValueChange={(v) => setIndustry(v as Industry)}
              required
            >
              <SelectTrigger id="industry" className="h-12 text-body">
                <SelectValue placeholder="업종을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {INDUSTRY_LABELS[ind]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 전화번호 (선택) */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-body-s font-bold">
              전화번호 <span className="text-neutral-500 font-normal">(선택, 인터뷰 연락용)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              pattern="\d{11}"
              maxLength={11}
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="01012345678 (하이픈 없이)"
              className="h-12 text-body"
            />
          </div>

          {/* 동의 체크박스 */}
          <div className="space-y-3 rounded-xl bg-cream-50/50 p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy"
                checked={privacyConsent}
                onCheckedChange={(v) => setPrivacyConsent(v === true)}
                required
                className="mt-0.5"
              />
              <Label htmlFor="privacy" className="text-body-s leading-relaxed cursor-pointer">
                <span className="text-destructive">[필수]</span>{' '}
                <Link href="/privacy" className="text-brand-700 underline" target="_blank">
                  개인정보처리방침
                </Link>
                에 동의합니다
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="marketing"
                checked={marketingConsent}
                onCheckedChange={(v) => setMarketingConsent(v === true)}
                required
                className="mt-0.5"
              />
              <Label htmlFor="marketing" className="text-body-s leading-relaxed cursor-pointer">
                <span className="text-destructive">[필수]</span> 출시 알림 수신에 동의합니다
              </Label>
            </div>
          </div>

          {errorMessage && (
            <p className="rounded-lg bg-destructive/10 px-4 py-3 text-body-s text-destructive">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="h-14 w-full bg-brand-500 text-[16px] font-bold text-white hover:bg-brand-600 disabled:opacity-60"
          >
            {isPending ? '신청 중…' : '사전 신청 완료하기 →'}
          </Button>

          <p className="text-center text-[12px] text-neutral-500">
            제출 시 신청 확인 메일이 입력하신 이메일로 발송됩니다.
          </p>
        </form>
      </div>
    </section>
  );
}
