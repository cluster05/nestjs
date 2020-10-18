import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfoDTO } from './dto/user-info.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('UserInfo') private userInfoModel: Model<any>) { }


    async getUser(userId: string) {
        const userInfo = await this.userInfoModel.findOne({ userId });
        return this.depoulateTeacherMail(userInfo);
    }

    async updateUser(userInfoDTO: UserInfoDTO, userId: string) {
        const isInfoPresent = await this.userInfoModel.findOne({ userId });
        const info = {
            ...userInfoDTO,
            userId
        }
        let userInfo;
        if (isInfoPresent) {
            userInfo = await this.userInfoModel.findOneAndUpdate({ userId }, info, { new: true });
        } else {
            userInfo = await new this.userInfoModel(info).save();
        }
        return this.depoulateTeacherMail(userInfo);
    }


    depoulateTeacherMail(userInfo: any) {
        const getUserInfo = userInfo.toObject();
        if (getUserInfo.role == 'teacher') {
            delete getUserInfo['teachermail'];
        }
        return getUserInfo;
    }

}
