import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtExtractorFromCookies } from 'src/common/utils/jwtExtractorFromCookies';
import { ManagersService } from './../managers.service';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly managersService: ManagersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractorFromCookies]),
      secretOrKey: process.env.SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const manager = await this.managersService.findManagerById(payload.sub);
      if (manager) {
        return manager;
      } else {
        throw new Error('로그인 정보가 잘못되었습니다');
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
