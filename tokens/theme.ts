/**
 * 드시네몰 리뉴얼 2차 디자인 토큰
 * 출처: Figma - [디자인작업] 드시네몰 리뉴얼_2차
 *
 * 이 파일은 디자인 토큰의 단일 진실 원천(Single Source of Truth)입니다.
 * 실제 스타일 적용은 app/globals.css의 @theme {} 블록을 통해 이루어집니다.
 * 이 파일은 타입 참조, 자동화 스크립트, 테스트 등에서 사용합니다.
 */

export const tokens = {
  colors: {
    // ─── Primary ───────────────────────────────────────────
    primary: {
      main: '#0CB5E2',
      dark: '#00ADDB',
      light: '#8AD9EE',
    },

    // ─── Gray Scale ────────────────────────────────────────
    gray: {
      1: '#111111',        // 가장 진한 텍스트
      2: '#333333',        // 기본 제목 텍스트
      3: '#535E66',        // 서브 텍스트
      4: '#666666',        // 보조 텍스트
      5: '#777777',        // 비활성 텍스트
      6: '#838B92',        // 플레이스홀더
      label: '#535E66',    // 레이블 텍스트
      sub: '#C0C0C0',      // 서브 구분선
      line1: '#C4CDD7',    // 라인 1 (진한)
      line2: '#DDDDDD',    // 라인 2 (기본)
      line3: '#E9EBEB',    // 라인 3 (연한)
      bg1: '#F5F5F5',      // 배경 1
      bg2: '#F6F7F9',      // 배경 2 (가장 연한)
    },

    // ─── Accent ────────────────────────────────────────────
    accent: {
      green: '#34C691',
      red: '#FF5146',
      yellow: '#FFCC33',
      lightBlue: '#E9F9FF',
      lightBlueDark: '#BECCD2',
      purple: '#F1EEFF',
      skyBlue: '#DFF6FF',
      orange: '#FFEFE0',
      lightPink: '#F2CFCD',
      beige: '#F8E2DF',
      pink: '#FFF0F0',
    },

    // ─── Base ──────────────────────────────────────────────
    white: '#FFFFFF',
    black: '#111111',
  },

  // ─── Typography ──────────────────────────────────────────
  typography: {
    fontFamily: {
      pretendard: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
    },

    // [크기, 굵기, 행간]
    scale: {
      h1: { size: '26px', weight: '700', lineHeight: 'normal' },
      h2: { size: '22px', weight: '700', lineHeight: 'normal' },
      h3: { size: '20px', weight: '700', lineHeight: 'normal' },
      h4: { size: '18px', weight: '700', lineHeight: '130%' },
      h5: { size: '16px', weight: '700', lineHeight: '130%' },
      h6: { size: '16px', weight: '500', lineHeight: '130%' },

      body1: { size: '16px', weight: '400', lineHeight: '130%' },
      body2: { size: '15px', weight: '500', lineHeight: '130%' },
      body3Bold: { size: '14px', weight: '700', lineHeight: '130%' },
      body3Medium: { size: '14px', weight: '500', lineHeight: '130%' },
      body4: { size: '14px', weight: '400', lineHeight: '130%' },
      body5: { size: '13px', weight: '500', lineHeight: '130%' },

      caption1: { size: '12px', weight: '700', lineHeight: '130%' },
      caption2: { size: '12px', weight: '400', lineHeight: '130%' },
      caption3: { size: '11px', weight: '400', lineHeight: '130%' },
    },

    fontWeight: {
      bold: '700',
      medium: '500',
      regular: '400',
    },
  },
} as const;

export type ColorTokens = typeof tokens.colors;
export type TypographyScale = keyof typeof tokens.typography.scale;
