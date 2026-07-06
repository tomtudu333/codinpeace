import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { colors, spacing, radius, shadows, glow, typography, animation, zIndex, glass, ThemeTokens } from './tokens';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  tokens: ThemeTokens;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const tokens: ThemeTokens = {
    ...colors,
    spacing,
    radius,
    shadows,
    glow,
    typography,
    animation,
    zIndex,
    glass,
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, tokens }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
