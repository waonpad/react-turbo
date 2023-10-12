import { useState, useMemo } from 'react';

import { storage } from '@/utils/storage';

import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(() => storage.get('token') || '');
  const [user, setUser] = useState<AuthContext['user']>(() => storage.get('user') || undefined);

  const value = useMemo(
    () => ({
      token,
      user,
      login: (email: string) => {
        setToken('token'), storage.set('token', '--------------------------------');
        setUser({ email }), storage.set('user', { email });
      },
      logout: () => {
        setToken(''), storage.remove('token');
        setUser(undefined), storage.remove('user');
      },
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
