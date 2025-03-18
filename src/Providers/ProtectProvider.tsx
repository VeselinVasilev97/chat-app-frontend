import { Navigate } from 'react-router-dom';
import { User } from '../types/types';

interface ProtectProviderProps {
  user: User | null;
  children: React.ReactNode;
}

const ProtectProvider = ({ user, children }: ProtectProviderProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectProvider;