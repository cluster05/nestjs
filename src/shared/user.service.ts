import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserDTO } from 'src/auth/auth.dto';
import { User } from 'src/types/auth.types';
import { Payload } from 'src/types/payload.types';



@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async register(userDTO: UserDTO): Promise<User> {
        const { email } = userDTO;
        const isEmailAlreadyExist = await this.userModel.findOne({ email });
        if (isEmailAlreadyExist) {
            throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
        }
        const createUser = await new this.userModel(userDTO).save();
        return this.sanitizeUser(createUser);
    }

    async login(userDTO: UserDTO): Promise<User> {
        const { email, password } = userDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    private sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }


    getDataWithToken(user: User, payload: Payload) {
        const token = sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        return { user, token };
    }
}
