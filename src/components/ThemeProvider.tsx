'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Get resolved theme (light or dark) based on theme preference
  const getResolvedTheme = useCallback((themeValue: Theme): 'light' | 'dark' => {
    if (themeValue === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light';
    }
    return themeValue;
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((themeValue: Theme) => {
    if (typeof window === 'undefined') return;

    const html = document.documentElement;
    const resolved = getResolvedTheme(themeValue);
    
    // Remove all theme classes
    html.classList.remove('light', 'dark');
    
    // Add the resolved theme class
    html.classList.add(resolved);
    
    // Update resolved theme state
    setResolvedTheme(resolved);
    
    // Apply data attribute for CSS selectors if needed
    html.setAttribute('data-theme', resolved);
  }, [getResolvedTheme]);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    setThemeState(savedTheme);
    const resolved = getResolvedTheme(savedTheme);
    setResolvedTheme(resolved);
    
    // Apply theme immediately
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      html.classList.remove('light', 'dark');
      html.classList.add(resolved);
      html.setAttribute('data-theme', resolved);
    }
  }, [getResolvedTheme]);

  // Listen for system theme changes when theme is set to 'system'
  useEffect(() => {
    if (!mounted || theme !== 'system' || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      applyTheme('system');
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme, mounted, applyTheme]);

  // Update theme when it changes
  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted, applyTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    applyTheme(newTheme);
  }, [applyTheme]);

  // Always provide the context, even before mount, to prevent errors
  // The context value will be updated once mounted
  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
