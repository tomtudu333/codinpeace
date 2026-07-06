import { CSSProperties } from 'react';

export type AnimationName =
  | 'fadeIn' | 'fadeOut'
  | 'scaleIn' | 'scaleOut'
  | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight'
  | 'expandIn' | 'collapseOut'
  | 'glowPulse'
  | 'spin'
  | 'skeletonPulse'
  | 'hoverLift';

export const animations: Record<AnimationName, CSSProperties> = {
  fadeIn: { animation: 'fadeIn var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  fadeOut: { animation: 'fadeOut var(--anim-normal, 200ms) var(--ease-in-out, ease-in-out) forwards' },
  scaleIn: { animation: 'scaleIn var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  scaleOut: { animation: 'scaleOut var(--anim-normal, 200ms) var(--ease-in-out, ease-in-out) forwards' },
  slideUp: { animation: 'slideUp var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  slideDown: { animation: 'slideDown var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  slideLeft: { animation: 'slideLeft var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  slideRight: { animation: 'slideRight var(--anim-normal, 200ms) var(--ease-out, ease-out) forwards' },
  expandIn: { animation: 'expandIn var(--anim-slow, 300ms) var(--ease-out, ease-out) forwards' },
  collapseOut: { animation: 'collapseOut var(--anim-slow, 300ms) var(--ease-in-out, ease-in-out) forwards' },
  glowPulse: { animation: 'glowPulse 2s var(--ease-in-out, ease-in-out) infinite' },
  spin: { animation: 'spin 1s linear infinite' },
  skeletonPulse: { animation: 'skeletonPulse 1.5s var(--ease-in-out, ease-in-out) infinite' },
  hoverLift: { transition: 'transform var(--anim-fast, 100ms) var(--ease-out, ease-out), box-shadow var(--anim-fast, 100ms) var(--ease-out, ease-out)' },
};

export function getAnimation(
  name: AnimationName,
  overrides?: { duration?: string; delay?: string }
): CSSProperties {
  const base = animations[name];
  if (!overrides) return base;
  return {
    ...base,
    animationDuration: overrides.duration ?? undefined,
    animationDelay: overrides.delay ?? undefined,
  };
}

export const keyframesCSS = `
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
@keyframes scaleOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.96); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideLeft { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: translateX(0); } }
@keyframes slideRight { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
@keyframes expandIn { from { opacity: 0; transform: scale(0.92); max-height: 0; } to { opacity: 1; transform: scale(1); max-height: 500px; } }
@keyframes collapseOut { from { opacity: 1; transform: scale(1); max-height: 500px; } to { opacity: 0; transform: scale(0.92); max-height: 0; } }
@keyframes glowPulse { 0%, 100% { box-shadow: 0 0 8px rgba(74,125,255,0.2); } 50% { box-shadow: 0 0 20px rgba(74,125,255,0.4); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes skeletonPulse { 0% { opacity: 0.3; } 50% { opacity: 0.6; } 100% { opacity: 0.3; } }
`;
