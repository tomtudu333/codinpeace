import { colorsLight } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { shadows, glow } from '../../tokens/shadows';
import { typography } from '../../tokens/typography';
import { motion } from '../../tokens/motion';
import { zIndex } from '../../tokens/zIndex';
import { blur } from '../../tokens/blur';
import { syntaxColors } from '../../tokens/syntaxColors';

export const lightTheme = {
  colors: colorsLight,
  spacing,
  radius,
  shadows,
  glow,
  typography,
  motion,
  zIndex,
  blur,
  syntax: syntaxColors,
};

export function lightThemeCSS(): string {
  return `[data-theme="light"] {
    --bg-primary: ${colorsLight.bg.primary};
    --bg-surface: ${colorsLight.bg.surface};
    --bg-surface-hover: ${colorsLight.bg.surfaceHover};
    --bg-surface-raised: ${colorsLight.bg.surfaceRaised};
    --bg-tooltip: ${colorsLight.bg.tooltip};
    --bg-overlay: ${colorsLight.bg.overlay};
    --bg-canvas: ${colorsLight.bg.canvas};
    --text-primary: ${colorsLight.text.primary};
    --text-secondary: ${colorsLight.text.secondary};
    --text-muted: ${colorsLight.text.muted};
    --text-accent: ${colorsLight.text.accent};
    --text-inverse: ${colorsLight.text.inverse};
    --border-subtle: ${colorsLight.border.subtle};
    --border-default: ${colorsLight.border.default};
    --border-hover: ${colorsLight.border.hover};
    --border-accent: ${colorsLight.border.accent};
    --accent-primary: ${colorsLight.accent.primary};
    --accent-primary-dim: ${colorsLight.accent.primaryDim};
    --accent-primary-glow: ${colorsLight.accent.primaryGlow};
    --accent-secondary: ${colorsLight.accent.secondary};
    --accent-secondary-dim: ${colorsLight.accent.secondaryDim};
    --status-info: ${colorsLight.status.info};
    --status-info-bg: ${colorsLight.status.infoBg};
    --status-success: ${colorsLight.status.success};
    --status-success-bg: ${colorsLight.status.successBg};
    --status-warning: ${colorsLight.status.warning};
    --status-warning-bg: ${colorsLight.status.warningBg};
    --status-error: ${colorsLight.status.error};
    --status-error-bg: ${colorsLight.status.errorBg};
    --severity-critical: ${colorsLight.severity.critical};
    --severity-high: ${colorsLight.severity.high};
    --severity-medium: ${colorsLight.severity.medium};
    --severity-low: ${colorsLight.severity.low};
    --severity-none: ${colorsLight.severity.none};
    --spacing-xs: ${spacing.xs};
    --spacing-sm: ${spacing.sm};
    --spacing-md: ${spacing.md};
    --spacing-lg: ${spacing.lg};
    --spacing-xl: ${spacing.xl};
    --spacing-2xl: ${spacing['2xl']};
    --spacing-3xl: ${spacing['3xl']};
    --radius-sm: ${radius.sm};
    --radius-md: ${radius.md};
    --radius-lg: ${radius.lg};
    --radius-xl: ${radius.xl};
    --radius-full: ${radius.full};
    --shadow-sm: ${shadows.sm};
    --shadow-md: ${shadows.md};
    --shadow-lg: ${shadows.lg};
    --shadow-xl: ${shadows.xl};
    --glow-accent: ${glow.accent};
    --glow-success: ${glow.success};
    --glow-warning: ${glow.warning};
    --glow-error: ${glow.error};
    --blur-sm: ${blur.sm};
    --blur-md: ${blur.md};
    --blur-lg: ${blur.lg};
    --blur-xl: ${blur.xl};
    --font-sans: ${typography.fontFamily};
    --font-mono: ${typography.fontMono};
    --font-xs: ${typography.sizes.xs};
    --font-sm: ${typography.sizes.sm};
    --font-base: ${typography.sizes.base};
    --font-md: ${typography.sizes.md};
    --font-lg: ${typography.sizes.lg};
    --font-xl: ${typography.sizes.xl};
    --font-2xl: ${typography.sizes['2xl']};
    --font-3xl: ${typography.sizes['3xl']};
    --weight-normal: ${typography.weights.normal};
    --weight-medium: ${typography.weights.medium};
    --weight-semibold: ${typography.weights.semibold};
    --weight-bold: ${typography.weights.bold};
    --anim-instant: ${motion.duration.instant};
    --anim-fast: ${motion.duration.fast};
    --anim-normal: ${motion.duration.normal};
    --anim-slow: ${motion.duration.slow};
    --anim-slower: ${motion.duration.slower};
    --ease-out: ${motion.easing.easeOut};
    --ease-in-out: ${motion.easing.easeInOut};
    --ease-spring: ${motion.easing.spring};
    --z-base: ${zIndex.base};
    --z-dropdown: ${zIndex.dropdown};
    --z-sticky: ${zIndex.sticky};
    --z-overlay: ${zIndex.overlay};
    --z-modal: ${zIndex.modal};
    --z-tooltip: ${zIndex.tooltip};
    --z-toast: ${zIndex.toast};
    --syntax-keyword: ${syntaxColors.keyword};
    --syntax-string: ${syntaxColors.string};
    --syntax-number: ${syntaxColors.number};
    --syntax-comment: ${syntaxColors.comment};
    --syntax-function: ${syntaxColors.function};
    --syntax-variable: ${syntaxColors.variable};
    --syntax-operator: ${syntaxColors.operator};
    --syntax-property: ${syntaxColors.property};
    --syntax-punctuation: ${syntaxColors.punctuation};
    --syntax-constant: ${syntaxColors.constant};
    --syntax-type: ${syntaxColors.type};
    --syntax-tag: ${syntaxColors.tag};
    --syntax-attr: ${syntaxColors.attr};
    --syntax-selector: ${syntaxColors.selector};
    --syntax-builtin: ${syntaxColors.builtin};
    --syntax-class-name: ${syntaxColors.className};
    --syntax-regex: ${syntaxColors.regex};
    --syntax-important: ${syntaxColors.important};
    --glass-opacity: 0.88;
    --glass-blur: 12px;
    --glass-border-opacity: 0.06;
  }`;
}
