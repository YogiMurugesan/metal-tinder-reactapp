import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser } from './api.js';

const AuthContext = createContext(null);
const TOKEN_KEY = 'metal-tinder-token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setCheckingAuth(false);
      return;
    }

    getCurrentUser()
      .then(result => setUser(result.user))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setCheckingAuth(false));
  }, []);

  const loginUser = (nextUser, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    checkingAuth,
    login: loginUser,
    logout,
  }), [user, checkingAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
