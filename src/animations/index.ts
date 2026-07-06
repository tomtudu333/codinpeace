import { CSSProperties } from 'react';

export type AnimationName =
  | 'fadeIn'
  | 'fadeOut'
  | 'scaleIn'
  | 'slideInFromBottom'
  | 'slideInFromTop'
  | 'slideInFromLeft'
  | 'slideInFromRight'
  | 'expandIn'
  | 'glowPulse'
  | 'spin'
  | 'skeletonPulse'
  | 'toastSlideIn';

export const animationStyles: Record<AnimationName, CSSProperties> = {
  fadeIn: { animation: 'fadeIn var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  fadeOut: { animation: 'fadeOut var(--anim-normal, 200ms) var(--ease-in-out, ease-in-out) forwards' },
  scaleIn: { animation: 'scaleIn var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  slideInFromBottom: { animation: 'slideInFromBottom var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  slideInFromTop: { animation: 'slideInFromTop var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  slideInFromLeft: { animation: 'slideInFromLeft var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  slideInFromRight: { animation: 'slideInFromRight var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  expandIn: { animation: 'expandIn var(--anim-slow, 300ms) var(--ease-out, ease-out) forwards' },
  glowPulse: { animation: 'glowPulse 2s var(--ease-in-out, ease-in-out) infinite' },
  spin: { animation: 'spin 1s linear infinite' },
  skeletonPulse: { animation: 'skeletonPulse 1.5s var(--ease-in-out, ease-in-out) infinite' },
  toastSlideIn: { animation: 'toastSlideIn var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
};

export function getAnimationStyle(
  name: AnimationName,
  duration?: string,
  delay?: string
): CSSProperties {
  const base = animationStyles[name];
  if (!duration && !delay) return base;
  return {
    ...base,
    animationDuration: duration ?? undefined,
    animationDelay: delay ?? undefined,
  };
}
