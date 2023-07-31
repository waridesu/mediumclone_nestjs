import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/dto/createUser.dto';
import { IUserResponse } from '@app/types/userResponse.interface';
import { LoginUserDto } from '@app/dto/loginUser.dto';
import { IExpressRequest } from '@app/types/expressRequest.interface';
import { User } from '@app/decorators/user,decorator';
import { UserEntity } from '@app/user/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async getCurrentUser(
    @User() user: UserEntity,
    @User('id') currentUserId: number,
  ): Promise<IUserResponse> {
    console.log(currentUserId);
    return this.userService.buildUserResponse(user);
  }
}
