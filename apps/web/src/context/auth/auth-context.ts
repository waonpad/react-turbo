import { createContext } from 'react';

import { User } from '@/types';

export type AuthContext = {
  token: string;
  user?: User;
  login: (email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext | null>(null);
