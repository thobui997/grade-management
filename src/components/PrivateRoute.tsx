import { useAuth } from '@app/contexts/AuthProvider';
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.authInfo?.token) return <Navigate to='/dang-nhap' replace />;
  return <Outlet />;
};

export default PrivateRoute;
