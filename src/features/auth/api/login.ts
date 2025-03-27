import { AuthInfo, BaseResponse } from '@app/core/types/api.type';
import { httpClient } from '@app/lib/http-client';

export const login = (email: string, password: string): Promise<BaseResponse<AuthInfo>> => {
  return httpClient.post('users/login', { email, password });
};
