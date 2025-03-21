import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../types/types';

interface ProtectProviderProps {
  user: User | null;
}

const ProtectProvider = ({ user }: ProtectProviderProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  


  return <Outlet />;
};

export default ProtectProvider;