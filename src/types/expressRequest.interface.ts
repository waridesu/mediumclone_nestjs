import { UserEntity } from '@app/user/user.entity';

export interface IExpressRequest extends Request {
  user?: UserEntity;
}
