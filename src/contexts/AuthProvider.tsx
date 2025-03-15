import { useLocalStorage, useNotification } from '@app/hooks';
import AuthServices from '@app/services/auth/login.service';
import { AuthInfo } from '@app/services/auth/login.type';
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
  const { showNotification, contextHolder } = useNotification();

  const loginAction = async (payload: { email: string; password: string }) => {
    try {
      const response = await AuthServices.login(payload.email, payload.password);
      const { meta, data } = response.data;
      if (+meta.code === 200) {
        setAuthInfo(data);
        setStoredValue(data);
        navigate('/');
        return;
      }
    } catch (err: any) {
      showNotification('error', 'Đăng nhập thất bại', 'Email hoặc mật khẩu không đúng');
    }
  };

  const logOut = () => {
    setAuthInfo(null);
    localStorage.removeItem(STORAGE_KEY);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authInfo, loginAction, logOut }}>
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
