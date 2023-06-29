import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { JwtPayloadI } from '../common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayloadI): Promise<User> {
    const { email } = payload

    const user = await this.userRepository.findOneBy({ email })

    if (!user) throw new UnauthorizedException('Token not valid')

    return user
  }
}
