import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/types';
import config from '../config';
import { LoginCredentials } from '../types/types';
import socketService from '../services/socketService';

interface AuthProviderType {
  user: User | null;
  handleSetUser: (user: User) => void;
  isLoading: boolean;
  handleSetLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<boolean>;
}

const AuthContext = createContext<AuthProviderType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSetUser = (user: User) => {
    setUser(user)
  }
  const handleSetLoading = (isLoading: boolean) => {
    setIsLoading(isLoading)
  }
  useEffect(() => {
    if (user && !socketService.isConnected()) {
      socketService.connect();
    }

  }, [user]);
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/validate`, {
          credentials: 'include',
        });
        if (response.ok) {
          const result = await response.json();
          setUser(result.user);
        }
      } catch (error) {
        console.error('An error occurred while checking user authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${config.API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        return false;
      }

      const result = await response.json();
      setUser(result.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${config.API_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        setUser(null);
        socketService.disconnect(); // Disconnect the socket on logout
      }
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      handleSetUser,
      isLoading,
      handleSetLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
};