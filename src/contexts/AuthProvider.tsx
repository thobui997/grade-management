import { useNotification } from '@app/contexts/NotificationProvider';
import { AuthInfo } from '@app/core/types/api.type';
import { login } from '@app/features/auth/api/login';
import { useLocalStorage } from '@app/hooks';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

interface AuthContextType {
  authInfo: AuthInfo | null;
  loginAction: (payload: { email: string; password: string }) => void;
  logOut: () => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

const STORAGE_KEY = 'site';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [initialAuthInfo, setStoredValue] = useLocalStorage<AuthInfo | null>(STORAGE_KEY, null);
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(initialAuthInfo);
  const notification = useNotification();

  const loginAction = async (payload: { email: string; password: string }) => {
    try {
      const response = await login(payload.email, payload.password);
      const { meta, data } = response;
      if (+meta.code === 200) {
        setAuthInfo(data);
        setStoredValue(data);
        navigate('/');
        return;
      }
    } catch (err: any) {
      notification.showNotification('error', 'Đăng nhập thất bại', 'Email hoặc mật khẩu không đúng');
    }
  };

  const logOut = () => {
    setAuthInfo(null);
    localStorage.removeItem(STORAGE_KEY);
    navigate('/login');
  };

  return <AuthContext.Provider value={{ authInfo, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
