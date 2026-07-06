export const colors = {
  bg: {
    primary: '#0a0a10',
    surface: 'rgba(15, 15, 25, 0.88)',
    surfaceHover: 'rgba(25, 25, 42, 0.92)',
    surfaceRaised: 'rgba(20, 20, 35, 0.95)',
    tooltip: 'rgba(30, 30, 50, 0.96)',
    overlay: 'rgba(0, 0, 0, 0.6)',
    canvas: '#0c0c14',
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.55)',
    muted: 'rgba(255, 255, 255, 0.30)',
    accent: '#4a7dff',
    inverse: '#0a0a10',
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.06)',
    default: 'rgba(255, 255, 255, 0.10)',
    hover: 'rgba(255, 255, 255, 0.15)',
    accent: 'rgba(74, 125, 255, 0.30)',
  },
  accent: {
    primary: '#4a7dff',
    primaryDim: 'rgba(74, 125, 255, 0.12)',
    primaryGlow: 'rgba(74, 125, 255, 0.25)',
    secondary: '#7c5cfc',
    secondaryDim: 'rgba(124, 92, 252, 0.12)',
  },
  status: {
    info: '#4a7dff',
    infoBg: 'rgba(74, 125, 255, 0.10)',
    success: '#34d399',
    successBg: 'rgba(52, 211, 153, 0.10)',
    warning: '#fbbf24',
    warningBg: 'rgba(251, 191, 36, 0.10)',
    error: '#f87171',
    errorBg: 'rgba(248, 113, 113, 0.10)',
  },
  severity: {
    critical: '#f87171',
    high: '#fb923c',
    medium: '#fbbf24',
    low: '#34d399',
    none: 'rgba(255, 255, 255, 0.20)',
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
};

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.30)',
  md: '0 4px 12px rgba(0, 0, 0, 0.30)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.35)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.40)',
};

export const glow = {
  accent: '0 0 20px rgba(74, 125, 255, 0.15)',
  success: '0 0 20px rgba(52, 211, 153, 0.15)',
  warning: '0 0 20px rgba(251, 191, 36, 0.15)',
  error: '0 0 20px rgba(248, 113, 113, 0.15)',
};

export const typography = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
  fontMono: "'SF Mono', 'Cascadia Code', 'Consolas', 'Courier New', monospace",
  sizes: {
    xs: '10px',
    sm: '11px',
    base: '13px',
    md: '14px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const animation = {
  duration: {
    instant: '50ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    easeOut: 'cubic-bezier(0.16, 1, 0.30, 1)',
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  tooltip: 500,
  toast: 600,
};

export const glass = {
  opacity: 0.88,
  blur: '12px',
  borderOpacity: 0.06,
};

export type ThemeTokens = typeof colors & {
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
  glow: typeof glow;
  typography: typeof typography;
  animation: typeof animation;
  zIndex: typeof zIndex;
  glass: typeof glass;
};
