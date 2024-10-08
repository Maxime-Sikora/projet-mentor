import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/role.decorateur';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserEntity } from './entities/user.entity';
import { Role } from './interface/role';
import { CreateUserDto } from './interface/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  signUpUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(body);
  }

  @Get('me')
  @Roles(Role.Admin, Role.Student)
  @UseGuards(AuthGuard, RolesGuard)
  userInfo(@Req() { user }): Promise<UserEntity> {
    console.log(user);
    return this.userService.findOne(user.username);
  }
}
