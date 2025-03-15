import { UserTypeEnum } from '@app/core/enums/user-type.enum';

export interface AuthInfo {
  token: string;
  userType: UserTypeEnum;
  expiration: number;
}
