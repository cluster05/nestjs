import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/auth/auth.dto';
import { User } from 'src/auth/auth.types';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/auth/payload.types';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async register(userDTO: UserDTO): Promise<{ accessToken: string }> {
        const { email } = userDTO;
        const isEmailAlreadyExist = await this.userModel.findOne({ email });
        if (isEmailAlreadyExist) {
            throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
        }
        const user = await new this.userModel(userDTO).save();
        return this.getToken(user);
    }

    async login(userDTO: UserDTO): Promise<{ accessToken: string }> {
        const { email, password } = userDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.getToken(user);
        } else {
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    getToken(user: User) {
        const sanitizedUser = this.sanitizeUser(user);
        const payload: Payload = {
            id: sanitizedUser._id,
            email: sanitizedUser.email
        }
        const accessToken = this.jwtService.sign(payload,);
        return { accessToken };
    }

    private sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }

}
