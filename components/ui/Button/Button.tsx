import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Variants 정의 ─────────────────────────────────────────────────────────────

const buttonVariants = cva(
  [
    'flex w-full items-center justify-center gap-1.5',
    'rounded-[10px]',
    'transition-colors duration-150',
    'cursor-pointer select-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        // Figma: 1depth_Ful/Bottom_button=Primary
        primary: [
          'bg-primary-dark text-white',
          'hover:bg-primary-main',
          'active:bg-primary-dark',
          'disabled:bg-gray-line2 disabled:text-gray-5',
        ],
        // Figma: 1depth_Ful/Bottom_button=Variant4 (bg accent-sky-blue + primary text)
        secondary: [
          'bg-accent-sky-blue text-primary-dark',
          'hover:bg-accent-light-blue',
          'active:bg-accent-sky-blue',
          'disabled:bg-gray-line3 disabled:text-gray-5',
        ],
        // Figma: 1depth_Ful/Bottom_button=Outline (1.5px border, primary-main 색상)
        outline: [
          'bg-white text-primary-dark border-[1.5px] border-primary-main',
          'hover:bg-accent-light-blue',
          'active:bg-accent-sky-blue',
          'disabled:bg-white disabled:text-gray-5 disabled:border-gray-line2',
        ],
        // 디자이너 누락 — gray 계열 일관성: 배경 없는 3차 액션
        ghost: [
          'bg-transparent text-gray-2',
          'hover:bg-gray-bg1',
          'active:bg-gray-bg2',
          'disabled:text-gray-5',
        ],
        // 디자이너 누락 — accent-red 토큰 기반 파괴적 액션, Primary 구조 동일
        danger: [
          'bg-accent-red text-white',
          'hover:opacity-90',
          'active:opacity-80',
          'disabled:bg-gray-line2 disabled:text-gray-5',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-caption1',
        md: 'h-10 px-4 text-body3-bold',
        lg: 'h-[52px] px-6 text-h5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// ─── 로딩 스피너 ────────────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M8 2a6 6 0 0 1 6 6h-2a4 4 0 0 0-4-4V2z"
      />
    </svg>
  );
}

// ─── Props 타입 ────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** 버튼 레이블 텍스트 */
  label?: string;
  /** 버튼 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 버튼 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
  /** 로딩 상태 (true이면 스피너 표시 및 클릭 불가) */
  loading?: boolean;
}

// ─── Button 컴포넌트 ────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, leftIcon, rightIcon, loading = false, disabled, variant, size, className, children, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        {...props}
      >
        {loading ? <LoadingSpinner /> : leftIcon}
        {label ?? children}
        {!loading && rightIcon}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
