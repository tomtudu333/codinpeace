import { useContext } from 'react';
import { ThemeContext, ThemeMode } from './ThemeProvider';

export interface ThemeTokens {
  spacing: Record<string, string>;
  radius: Record<string, string>;
  shadows: Record<string, string>;
  glow: Record<string, string>;
  typography: Record<string, any>;
  motion: Record<string, any>;
  zIndex: Record<string, number>;
  blur: Record<string, string>;
  syntax: Record<string, string>;
  [key: string]: any;
}

export interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  tokens: ThemeTokens;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
