import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/types';
import config from '../config';
import { LoginCredentials } from '../types/types';
import socketService from '../services/socketService'; // Import your socket service

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
  login: (credentials: LoginCredentials) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Connect/disconnect socket when user auth state changes
  useEffect(() => {
    if (user) {
      // User is logged in, connect socket
      socketService.connect();
    } else {
      // User is logged out, disconnect socket
      socketService.disconnect();
    }
    
    // Clean up on component unmount
    return () => {
      socketService.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const checkUserAuth = async () => {
      setIsLoading(true);
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

  const login = async (credentials: LoginCredentials) => {
    const response = await fetch(`${config.API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (response.status !== 200) {
      return false;
    }

    const result = await response.json();
    setUser(result.user);
  }

  const logout = async () => {
    try {
      const res = await fetch(`${config.API_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      if(res.ok){
        setUser(null);
      }
      
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};