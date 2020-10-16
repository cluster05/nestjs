import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { UserService } from '../shared/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY,
        });
    }

    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.userService.login(payload);
        if (!user) {
            return done(
                new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
                false,
            );
        }

        return done(null, user, payload.iat);
    }


}