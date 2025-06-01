"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

// Helper to get initial theme, avoiding localStorage access on server
const getInitialTheme = (storageKey: string, defaultTheme: Theme): Theme => {
  if (typeof window === 'undefined') {
    return defaultTheme;
  }
  try {
    const storedTheme = localStorage.getItem(storageKey);
    return (storedTheme as Theme) || defaultTheme;
  } catch (e) {
    return defaultTheme;
  }
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "fileflow-theme",
  enableSystem = true, // Added enableSystem prop for consistency
  // attribute = "class", // Added attribute prop for consistency
  // disableTransitionOnChange = false, // Added prop for consistency
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  attribute?: string; // Usually "class"
  disableTransitionOnChange?: boolean;
}) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme(storageKey, defaultTheme));
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  const applyTheme = useCallback((currentTheme: Theme) => {
    let activeTheme: ResolvedTheme;
    if (currentTheme === "system" && enableSystem) {
      activeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else if (currentTheme === "dark") {
      activeTheme = "dark";
    }
    else {
      activeTheme = "light";
    }

    setResolvedTheme(activeTheme);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(activeTheme);
  }, [enableSystem]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      applyTheme(theme);
    }
  }, [theme, applyTheme]);

  useEffect(() => {
    if (typeof window !== 'undefined' && theme === "system" && enableSystem) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, applyTheme, enableSystem]);

  const setTheme = (newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        // localStorage is not available or disabled
      }
    }
    setThemeState(newTheme);
  };
  
  // Effect to set initial resolved theme, runs once on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
        let initialResolved: ResolvedTheme;
        const stored = getInitialTheme(storageKey, defaultTheme);
        if (stored === "system" && enableSystem) {
            initialResolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        } else if (stored === "dark") {
            initialResolved = "dark";
        } else {
            initialResolved = "light";
        }
        setResolvedTheme(initialResolved);
        
        // Apply the theme immediately on mount for the client
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(initialResolved);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <ThemeProviderContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
