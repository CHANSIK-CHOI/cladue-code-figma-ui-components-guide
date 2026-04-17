import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// ─── 아이콘 예시 (실제 프로젝트에서는 아이콘 라이브러리 사용) ──────────────────────

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '드시네몰 기본 버튼 컴포넌트. 5가지 variant(`primary` / `secondary` / `outline` / `ghost` / `danger`), 3가지 size(`sm` / `md` / `lg`), 아이콘 및 로딩 상태를 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: '버튼 스타일 variant',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기 (sm: 32px / md: 40px / lg: 48px)',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: '버튼 레이블 텍스트. `children`으로도 전달 가능.',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태. `true`이면 스피너가 표시되고 클릭이 불가합니다.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    leftIcon: {
      control: false,
      description: '버튼 왼쪽에 표시할 아이콘 (ReactNode). 로딩 중에는 스피너로 대체됩니다.',
    },
    rightIcon: {
      control: false,
      description: '버튼 오른쪽에 표시할 아이콘 (ReactNode). 로딩 중에는 숨겨집니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Playground (인터랙티브 테스트용) ──────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: '버튼',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Controls 패널에서 모든 Props를 실시간으로 변경해 볼 수 있는 인터랙티브 스토리입니다.',
      },
    },
  },
};

// ─── 기본 스토리 ───────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: '버튼',
    variant: 'primary',
    size: 'md',
  },
};

// ─── Variant 스토리 ────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Outline" variant="outline" />
      <Button label="Ghost" variant="ghost" />
      <Button label="Danger" variant="danger" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '지원하는 5가지 스타일 variant를 한눈에 비교합니다. 버튼은 항상 부모 너비를 채웁니다.',
      },
    },
  },
};

// ─── Size 스토리 ───────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Button label="Small (32px)" size="sm" />
      <Button label="Medium (40px)" size="md" />
      <Button label="Large (48px)" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'sm(32px) / md(40px) / lg(48px) 세 가지 크기를 비교합니다. 버튼은 항상 부모 너비를 채웁니다.',
      },
    },
  },
};

// ─── 아이콘 포함 스토리 ────────────────────────────────────────────────────────

export const WithLeftIcon: Story = {
  args: {
    label: '검색',
    variant: 'primary',
    leftIcon: <IconSearch />,
  },
  parameters: {
    docs: {
      description: {
        story: '`leftIcon` prop으로 버튼 왼쪽에 아이콘을 배치합니다.',
      },
    },
  },
};

export const WithRightIcon: Story = {
  args: {
    label: '다음',
    variant: 'primary',
    rightIcon: <IconArrowRight />,
  },
  parameters: {
    docs: {
      description: {
        story: '`rightIcon` prop으로 버튼 오른쪽에 아이콘을 배치합니다.',
      },
    },
  },
};

export const WithBothIcons: Story = {
  args: {
    label: '검색하기',
    variant: 'outline',
    leftIcon: <IconSearch />,
    rightIcon: <IconArrowRight />,
  },
  parameters: {
    docs: {
      description: {
        story: '`leftIcon`과 `rightIcon`을 함께 사용하는 예시입니다.',
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'ghost',
    leftIcon: <IconSearch />,
    'aria-label': '검색',
  },
  parameters: {
    docs: {
      description: {
        story: '`label` 없이 아이콘만 표시할 때는 반드시 `aria-label`을 제공해야 합니다.',
      },
    },
  },
};

// ─── 상태 스토리 ───────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button label="Primary" variant="primary" disabled />
      <Button label="Secondary" variant="secondary" disabled />
      <Button label="Outline" variant="outline" disabled />
      <Button label="Ghost" variant="ghost" disabled />
      <Button label="Danger" variant="danger" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '`disabled` 상태에서의 각 variant 모습입니다. 클릭 이벤트가 차단되고 커서가 `not-allowed`로 바뀝니다.',
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button label="로딩 중..." variant="primary" loading />
      <Button label="처리 중..." variant="secondary" loading />
      <Button label="저장 중..." variant="outline" loading />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '`loading={true}` 상태에서는 스피너가 표시되고 버튼이 자동으로 비활성화됩니다.',
      },
    },
  },
};

// ─── 모든 variant × size 매트릭스 ─────────────────────────────────────────────

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'outline', 'ghost', 'danger'] as const).map(
        (variant) => (
          <div key={variant} className="grid grid-cols-[80px_1fr_1fr_1fr] gap-3 items-center">
            <span className="text-caption2 text-gray-4 capitalize">{variant}</span>
            <Button label="Small" variant={variant} size="sm" />
            <Button label="Medium" variant={variant} size="md" />
            <Button label="Large" variant={variant} size="lg" />
          </div>
        )
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '5가지 variant × 3가지 size의 모든 조합(15가지)을 한눈에 확인합니다.',
      },
    },
  },
};
