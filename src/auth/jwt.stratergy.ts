import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/types/payload.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/auth.types';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel('User') private userModel: Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'SECRET_KEY',
        });
    }

    async validate(payload: Payload) {
        const { email } = payload;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }
        return user;
    }
}