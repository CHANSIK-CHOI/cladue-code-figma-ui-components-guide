# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

드시네몰 리뉴얼 2차 디자인 시스템. Figma에서 추출한 디자인 토큰 기반으로 커스텀 컴포넌트를 구현하고 Storybook으로 문서화하는 가이드 프로젝트.

**shadcn/ui는 사용하지 않음.** Radix UI 헤드리스 프리미티브를 직접 Tailwind로 스타일링하는 방식.

## 주요 명령어

```bash
npm run dev          # Next.js 개발 서버 (localhost:3000)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 실행
npm run storybook    # Storybook 개발 서버 (localhost:6006)
npm run build-storybook  # Storybook 정적 빌드
npx vitest           # Storybook 스토리 기반 브라우저 테스트 (Playwright)
npx tsc --noEmit     # 타입 검사만 실행
```

## 아키텍처

### 디자인 토큰 이중 구조

토큰은 두 파일이 **항상 동기화**되어야 함. 하나를 수정하면 다른 하나도 수정.

| 파일 | 역할 |
|------|------|
| `tokens/theme.ts` | 단일 진실 원천(SSoT). TypeScript 타입/자동화용. hex 값이 여기에 있음 |
| `app/globals.css` | Tailwind v4 런타임 설정. `@theme {}` 블록이 실제 유틸리티 클래스를 생성 |

### Tailwind v4 설정 방식

이 프로젝트는 **Tailwind v4** 사용. `tailwind.config.js` 없음. 모든 테마 설정은 `app/globals.css`의 `@theme {}` 블록에서 관리.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-primary-main: #0CB5E2;
  /* → 자동으로 bg-primary-main, text-primary-main 등 유틸리티 생성 */
}
```

### Typography 유틸리티 클래스

단순 font-size 클래스 대신 `@utility`로 정의된 복합 클래스 사용. font-size + font-weight + line-height를 한 번에 적용.

```tsx
// 사용법
<h1 className="text-h1">제목</h1>       // 26px Bold normal
<p className="text-body4">본문</p>       // 14px Regular 130%
<span className="text-caption2">설명</span>  // 12px Regular 130%
```

정의된 클래스: `text-h1` ~ `text-h6`, `text-body1` ~ `text-body5`, `text-body3-bold`, `text-body3-medium`, `text-caption1` ~ `text-caption3`

### 컴포넌트 구조

```
components/
├── ui/          ← 디자인 적용된 커스텀 컴포넌트 (Button, Input 등)
│   └── ComponentName/
│       ├── ComponentName.tsx
│       └── ComponentName.stories.tsx
└── shared/      ← 레이아웃 등 공통 컴포넌트
```

`stories/` 디렉토리는 Storybook 기본 예제 파일이므로 실제 컴포넌트는 `components/` 아래에 작성.

### 핵심 유틸리티

**`lib/utils.ts`의 `cn()` 함수** — 모든 컴포넌트에서 className 조합 시 필수 사용:

```ts
import { cn } from '@/lib/utils';

cn('px-4 py-2', isActive && 'bg-primary-main', 'text-white')
```

### Path Alias

`@/*` → 프로젝트 루트 (`./`)

```ts
import { cn } from '@/lib/utils';
import { tokens } from '@/tokens/theme';
```

### Storybook

- 프레임워크: `@storybook/nextjs-vite` (Vite 기반)
- 스토리 위치: `components/**/*.stories.@(ts|tsx)` 또는 `stories/**/*.stories.@(ts|tsx)`
- Tailwind 스타일은 `.storybook/preview.ts`에서 `app/globals.css` 임포트로 적용됨
- 테스트: `@storybook/addon-vitest` + Playwright로 스토리를 브라우저 테스트로 실행

### 주요 라이브러리 용도

| 라이브러리 | 용도 |
|-----------|------|
| `@radix-ui/react-*` | 접근성 헤드리스 프리미티브 (모달, 드롭다운, 탭 등) |
| `motion` | 애니메이션 |
| `embla-carousel-react` | 캐러셀/슬라이더 |
| `class-variance-authority` | 컴포넌트 variant 관리 |
| `react-hook-form` + `zod` + `@hookform/resolvers` | 폼 및 유효성 검사 |
| `zustand` | 전역 상태 관리 |
| `@tanstack/react-query` | 서버 상태 / 데이터 페칭 |
| `date-fns` | 날짜 처리 |
