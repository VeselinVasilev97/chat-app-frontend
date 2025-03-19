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
        
        const response = await fetch(`${config.API_URL}/validate`, {
          credentials: 'include', // This is the key part - tells fetch to include cookies
          method: 'GET'
        });
        
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          
          setUser(userData.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserAuth();
  }, []);
  
  const logout = () => {
    
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