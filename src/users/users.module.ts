import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entities/user.entity'
import { JwtStrategy } from './strategies/jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '2h'
        }
      })
    })
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class UsersModule {}
