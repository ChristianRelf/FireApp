'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChange } from '@/lib/auth';
import { User, AuthState } from '@/types';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthState = {
    user,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};