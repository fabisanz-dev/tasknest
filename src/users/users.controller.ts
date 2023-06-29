import { Controller, Get, Post, Body } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Auth } from './decorator/auth.decorator'
import { User } from './entities/user.entity'
import { GetUser } from './decorator/get-user.decorator'
import { LoginUserDto } from './dto/login-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto)
  }

  @Get()
  @Auth()
  privateRoute3(@GetUser() user: User) {
    return user
  }
}
