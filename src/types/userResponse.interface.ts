import { UserType } from '@app/types/user.type';

export interface IUserResponse {
  user: UserType & { token: string };
}
