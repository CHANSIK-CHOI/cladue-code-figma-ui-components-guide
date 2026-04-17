# 드시네몰 디자인 시스템

드시네몰 리뉴얼 2차 디자인 시스템 가이드 프로젝트입니다.
Figma에서 추출한 디자인 토큰을 기반으로 커스텀 컴포넌트를 구현하고 Storybook으로 문서화합니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 + React 19 |
| 스타일 | Tailwind CSS v4 (CSS-first 설정) |
| 컴포넌트 문서화 | Storybook 10 (`@storybook/nextjs-vite`) |
| 헤드리스 UI | Radix UI (shadcn/ui 미사용) |
| 타입 | TypeScript 5 |
| Variant 관리 | class-variance-authority (CVA) |
| 폼 | react-hook-form + zod |
| 전역 상태 | Zustand |
| 서버 상태 | TanStack Query |
| 애니메이션 | Motion |
| 캐러셀 | Embla Carousel |
| 테스트 | Vitest + Playwright (스토리 기반 브라우저 테스트) |

## 시작하기

```bash
# 의존성 설치
npm install

# Next.js 개발 서버 (http://localhost:3000)
npm run dev

# Storybook 개발 서버 (http://localhost:6006)
npm run storybook
```

## 주요 명령어

```bash
npm run dev              # Next.js 개발 서버
npm run build            # 프로덕션 빌드
npm run lint             # ESLint 실행
npm run storybook        # Storybook 개발 서버
npm run build-storybook  # Storybook 정적 빌드
npx vitest               # 스토리 기반 브라우저 테스트
npx tsc --noEmit         # 타입 검사
```

## 프로젝트 구조

```
├── app/
│   ├── globals.css      # Tailwind v4 @theme 설정 (런타임 토큰)
│   └── layout.tsx
├── components/
│   ├── ui/              # 디자인 적용 커스텀 컴포넌트
│   │   └── Button/
│   │       ├── Button.tsx
│   │       └── Button.stories.tsx
│   └── shared/          # 레이아웃 등 공통 컴포넌트
├── tokens/
│   └── theme.ts         # 디자인 토큰 단일 진실 원천 (SSoT)
├── lib/
│   └── utils.ts         # cn() 유틸리티
└── stories/             # Storybook 기본 예제 (참고용)
```

## 디자인 토큰 시스템

토큰은 두 파일이 **항상 동기화**되어야 합니다.

### `tokens/theme.ts` — 단일 진실 원천

TypeScript 타입 참조 및 자동화 스크립트용. 실제 hex 값이 여기에 있습니다.

```ts
import { tokens } from '@/tokens/theme';

tokens.colors.primary.main   // '#0CB5E2'
tokens.colors.gray[2]        // '#333333'
```

### `app/globals.css` — Tailwind 런타임 설정

`@theme {}` 블록이 실제 유틸리티 클래스를 생성합니다.

```css
@theme {
  --color-primary-main: #0CB5E2;
  /* → bg-primary-main, text-primary-main, border-primary-main 등 자동 생성 */
}
```

### 컬러 토큰

| 그룹 | 변수 예시 | 설명 |
|------|-----------|------|
| Primary | `bg-primary-main` `bg-primary-dark` | 브랜드 컬러 (파란 계열) |
| Gray | `text-gray-1` ~ `text-gray-6` | 텍스트 계층 |
| Gray Surface | `bg-gray-bg1` `bg-gray-bg2` | 배경 |
| Gray Border | `border-gray-line1` ~ `border-gray-line3` | 구분선 |
| Accent | `bg-accent-red` `bg-accent-green` | 상태 색상 |

### Typography 유틸리티

font-size + font-weight + line-height를 한 번에 적용하는 복합 클래스입니다.

```tsx
<h1 className="text-h1">제목</h1>           // 26px Bold
<h4 className="text-h4">소제목</h4>          // 18px Bold 130%
<p className="text-body4">본문</p>           // 14px Regular 130%
<span className="text-caption2">설명</span>  // 12px Regular 130%
```

| 클래스 | 크기 | 굵기 | 행간 |
|--------|------|------|------|
| `text-h1` | 26px | Bold | normal |
| `text-h2` | 22px | Bold | normal |
| `text-h3` | 20px | Bold | normal |
| `text-h4` | 18px | Bold | 130% |
| `text-h5` | 16px | Bold | 130% |
| `text-h6` | 16px | Medium | 130% |
| `text-body1` | 16px | Regular | 130% |
| `text-body2` | 15px | Medium | 130% |
| `text-body3-bold` | 14px | Bold | 130% |
| `text-body3-medium` | 14px | Medium | 130% |
| `text-body4` | 14px | Regular | 130% |
| `text-body5` | 13px | Medium | 130% |
| `text-caption1` | 12px | Bold | 130% |
| `text-caption2` | 12px | Regular | 130% |
| `text-caption3` | 11px | Regular | 130% |

## 컴포넌트

### Button

```tsx
import { Button } from '@/components/ui/Button/Button';

// 기본 사용
<Button label="확인" />

// Variant
<Button variant="primary" label="주요 액션" />
<Button variant="secondary" label="보조 액션" />
<Button variant="outline" label="테두리형" />
<Button variant="ghost" label="텍스트형" />
<Button variant="danger" label="삭제" />

// Size
<Button size="sm" label="소형" />
<Button size="md" label="중형" />   {/* 기본값 */}
<Button size="lg" label="대형" />

// 아이콘 / 로딩
<Button leftIcon={<Icon />} label="아이콘 버튼" />
<Button loading label="처리 중..." />
<Button disabled label="비활성" />
```

## 컴포넌트 제작 가이드

### 핵심 규칙

1. **`cn()` 필수 사용** — className 조합 시 항상 사용

```ts
import { cn } from '@/lib/utils';

cn('px-4 py-2', isActive && 'bg-primary-main')
```

2. **CVA로 variant 관리** — 컴포넌트 상태별 스타일 분기

```ts
import { cva, type VariantProps } from 'class-variance-authority';

const componentVariants = cva('base-classes', {
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});
```

3. **Radix UI 헤드리스 프리미티브** — 접근성이 필요한 컴포넌트 (모달, 드롭다운, 탭 등)

4. **width 100% 기준** — 컴포넌트는 기본적으로 부모 너비를 채움

### 파일 구조

```
components/ui/ComponentName/
├── ComponentName.tsx          # 컴포넌트 구현
└── ComponentName.stories.tsx  # Storybook 스토리
```

## Path Alias

```ts
import { cn } from '@/lib/utils';
import { tokens } from '@/tokens/theme';
import { Button } from '@/components/ui/Button/Button';
```

`@/*` → 프로젝트 루트 (`./`)
