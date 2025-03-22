import { Navigate, Outlet } from 'react-router-dom';
// import { User } from '../types/types';
import { useUser } from './AuthProvider';


  const ProtectProvider = () => {
    const {user} = useUser()
    console.log(user);
    
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectProvider;