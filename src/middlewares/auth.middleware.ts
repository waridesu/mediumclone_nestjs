import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { IExpressRequest } from '@app/types/expressRequest.interface';
import { JWT_SECRET } from '@app/config';
import { verify } from 'jsonwebtoken';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.get('authorization')) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.get('authorization').split(' ')[1];
    try {
      const decode = verify(token, JWT_SECRET) as {
        id: string;
        username: string;
      };
      req.user = await this.userService.findById(decode.id);
      next();
    } catch (e) {
      req.user = null;
      next();
    }
    next();
  }
}
