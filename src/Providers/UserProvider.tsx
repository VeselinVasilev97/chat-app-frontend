import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/types';
import config from '../config';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for saved user data on initial load
  useEffect(() => {
    const checkUserAuth = async () => {
      setIsLoading(true);
      try {
        const token = sessionStorage.getItem(config.ACCESS_TOKEN_KEY);
        if (token) {
          // Use config for API endpoint
          const response = await fetch(`${config.API_URL}/validate`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
          } else {
            // Token is invalid, remove it
            sessionStorage.removeItem(config.ACCESS_TOKEN_KEY);
          }
        }
      } catch (error) {
        sessionStorage.removeItem(config.ACCESS_TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserAuth();
  }, []);
  
  const logout = () => {
    sessionStorage.removeItem(config.ACCESS_TOKEN_KEY);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading, logout }}>
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