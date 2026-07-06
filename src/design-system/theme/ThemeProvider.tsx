import React, { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { darkTheme, darkThemeCSS } from './themes/dark';
import { lightTheme, lightThemeCSS } from './themes/light';
import type { ThemeTokens } from './useTheme';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  tokens: ThemeTokens;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function injectCSS(css: string) {
  const id = 'theme-variables';
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = css;
}

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
    injectCSS(t === 'dark' ? darkThemeCSS() : lightThemeCSS());
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    injectCSS(theme === 'dark' ? darkThemeCSS() : lightThemeCSS());
  }, [theme]);

  const tokens: ThemeTokens = {
    ...(theme === 'dark' ? darkTheme : lightTheme).colors as any,
    spacing: (theme === 'dark' ? darkTheme : lightTheme).spacing,
    radius: (theme === 'dark' ? darkTheme : lightTheme).radius,
    shadows: (theme === 'dark' ? darkTheme : lightTheme).shadows,
    glow: (theme === 'dark' ? darkTheme : lightTheme).glow,
    typography: (theme === 'dark' ? darkTheme : lightTheme).typography,
    motion: (theme === 'dark' ? darkTheme : lightTheme).motion,
    zIndex: (theme === 'dark' ? darkTheme : lightTheme).zIndex,
    blur: (theme === 'dark' ? darkTheme : lightTheme).blur,
    syntax: (theme === 'dark' ? darkTheme : lightTheme).syntax,
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, tokens }}>
      {children}
    </ThemeContext.Provider>
  );
};
