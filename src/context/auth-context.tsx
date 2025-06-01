
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To handle initial auth check
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Simulate checking auth status (e.g., from localStorage or a token)
    // For now, we assume the user is not authenticated initially.
    // In a real app, you'd check a token here.
    const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('isAuthenticated') : null;
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/login') {
      router.push('/login');
    }
    if (!isLoading && isAuthenticated && pathname === '/login') {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const login = () => {
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
    }
    router.push('/');
  };

  const logout = () => {
    setIsAuthenticated(false);
     if (typeof window !== 'undefined') {
        localStorage.removeItem('isAuthenticated');
    }
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
