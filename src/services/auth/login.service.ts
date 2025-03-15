import { BaseResponse } from '@app/core/models/base.type';
import { AuthInfo } from '@app/services/auth/login.type';
import httpClient from '@app/services/http-client';

const login = (email: string, password: string) => {
  return httpClient.post<BaseResponse<AuthInfo>>('users/login', { email, password });
};

const AuthServices = {
  login
};

export default AuthServices;
