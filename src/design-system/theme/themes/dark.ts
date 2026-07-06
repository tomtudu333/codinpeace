import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { shadows, glow } from '../../tokens/shadows';
import { typography } from '../../tokens/typography';
import { motion } from '../../tokens/motion';
import { zIndex } from '../../tokens/zIndex';
import { blur } from '../../tokens/blur';
import { syntaxColors } from '../../tokens/syntaxColors';

export const darkTheme = {
  colors,
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

export function darkThemeCSS(): string {
  return `[data-theme="dark"] {
    --bg-primary: ${colors.bg.primary};
    --bg-surface: ${colors.bg.surface};
    --bg-surface-hover: ${colors.bg.surfaceHover};
    --bg-surface-raised: ${colors.bg.surfaceRaised};
    --bg-tooltip: ${colors.bg.tooltip};
    --bg-overlay: ${colors.bg.overlay};
    --bg-canvas: ${colors.bg.canvas};
    --text-primary: ${colors.text.primary};
    --text-secondary: ${colors.text.secondary};
    --text-muted: ${colors.text.muted};
    --text-accent: ${colors.text.accent};
    --text-inverse: ${colors.text.inverse};
    --border-subtle: ${colors.border.subtle};
    --border-default: ${colors.border.default};
    --border-hover: ${colors.border.hover};
    --border-accent: ${colors.border.accent};
    --accent-primary: ${colors.accent.primary};
    --accent-primary-dim: ${colors.accent.primaryDim};
    --accent-primary-glow: ${colors.accent.primaryGlow};
    --accent-secondary: ${colors.accent.secondary};
    --accent-secondary-dim: ${colors.accent.secondaryDim};
    --status-info: ${colors.status.info};
    --status-info-bg: ${colors.status.infoBg};
    --status-success: ${colors.status.success};
    --status-success-bg: ${colors.status.successBg};
    --status-warning: ${colors.status.warning};
    --status-warning-bg: ${colors.status.warningBg};
    --status-error: ${colors.status.error};
    --status-error-bg: ${colors.status.errorBg};
    --severity-critical: ${colors.severity.critical};
    --severity-high: ${colors.severity.high};
    --severity-medium: ${colors.severity.medium};
    --severity-low: ${colors.severity.low};
    --severity-none: ${colors.severity.none};
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
