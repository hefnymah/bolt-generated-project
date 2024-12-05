import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMsal, MsalProvider } from "@azure/msal-react";
import { loginRequest, msalInstance } from '../config/auth';
import { AccountInfo, InteractionStatus } from '@azure/msal-browser';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loginAsDemo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'demo'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { instance, accounts, inProgress } = useMsal();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (accounts.length > 0 && inProgress === InteractionStatus.None) {
        const currentAccount = accounts[0];
        try {
          await instance.initialize();
          instance.setActiveAccount(currentAccount);
          updateUserFromAccount(currentAccount);
        } catch (error) {
          console.error('Failed to initialize authentication:', error);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [accounts, inProgress, instance]);

  const updateUserFromAccount = (account: AccountInfo) => {
    setUser({
      id: account.localAccountId,
      name: account.name || '',
      email: account.username,
      role: account.idTokenClaims?.roles?.[0] || 'user'
    });
  };

  const login = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      if (response.account) {
        updateUserFromAccount(response.account);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (user?.role === 'demo') {
        setUser(null);
      } else {
        await instance.logoutPopup({
          postLogoutRedirectUri: window.location.origin,
        });
        setUser(null);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const loginAsDemo = () => {
    setUser(DEMO_USER);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login, 
        logout,
        loginAsDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
