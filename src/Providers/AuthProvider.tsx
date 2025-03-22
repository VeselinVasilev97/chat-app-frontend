import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/types';
import config from '../config';
import { LoginCredentials } from '../types/types';
import socketService from '../services/socketService';

interface AuthProviderType {
  user: User | null;
  setUser: (user: User | null) => void;
  sendFriendRequest: (email: string) => Promise<boolean>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
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

  useEffect(() => {
    if (user) {
      socketService.connect();
    } else {
      socketService.disconnect();
    }
    
    return () => {
      socketService.disconnect();
    };
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
      }
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const sendFriendRequest = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${config.API_URL}/users/send-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Friend request failed:', data.error?.message || 'Unknown error');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error sending friend request:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      sendFriendRequest, 
      isLoading, 
      setIsLoading, 
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