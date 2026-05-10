import type { ReactNode } from 'react';
import { cn } from '@on-schedule/ui/lib/utils';

type EyebrowVariant = 'soft' | 'solid';

type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowVariant?: EyebrowVariant;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

const EYEBROW_STYLE: Record<EyebrowVariant, string> = {
  soft: 'bg-accent text-accent-foreground',
  solid: 'bg-brand-500 text-white tracking-wider',
};

export function SectionHeading({
  eyebrow,
  eyebrowVariant = 'soft',
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('text-center', className)}>
      {eyebrow && (
        <span
          className={cn(
            'mb-4 inline-block rounded-full px-3 py-1 text-[12px] font-bold',
            EYEBROW_STYLE[eyebrowVariant],
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-h2 font-extrabold text-foreground text-pretty md:text-[36px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-body-l text-neutral-700">
          {subtitle}
        </p>
      )}
    </div>
  );
}
