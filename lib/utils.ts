import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * 커스텀 타이포그래피 유틸리티 클래스를 인식하는 tailwind-merge 인스턴스.
 * text-h1~h6, text-body*, text-caption* 등을 font-size 그룹으로 등록해
 * text-white 같은 텍스트 색상 클래스와 충돌하지 않도록 합니다.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'body1', 'body2', 'body3-bold', 'body3-medium',
            'body4', 'body5',
            'caption1', 'caption2', 'caption3',
          ],
        },
      ],
    },
  },
});

/**
 * Tailwind 클래스를 조건부로 조합하고 충돌을 자동으로 해결합니다.
 * clsx로 조건부 클래스를 조합한 뒤 tailwind-merge로 중복/충돌을 제거합니다.
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary-main', 'text-white')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
