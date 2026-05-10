import { cn } from '@on-schedule/ui/lib/utils';

type BrandMarkProps = {
  size?: 'sm' | 'md';
  showWordmark?: boolean;
  className?: string;
};

const SIZE_MAP = {
  sm: { mark: 'h-7 w-7 rounded-md text-[12px]', word: 'text-[15px]' },
  md: { mark: 'h-[30px] w-[30px] rounded-lg text-[14px]', word: 'text-[19px] -tracking-[0.02em]' },
} as const;

export function BrandMark({
  size = 'md',
  showWordmark = true,
  className,
}: BrandMarkProps) {
  const sz = SIZE_MAP[size];
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center bg-brand-500 font-display font-extrabold leading-none text-white',
          sz.mark,
        )}
      >
        온
      </span>
      {showWordmark && (
        <span
          className={cn(
            'font-display font-extrabold leading-none text-foreground',
            sz.word,
          )}
        >
          온스케줄
        </span>
      )}
    </span>
  );
}
