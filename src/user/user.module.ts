import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserInfoSchema } from './model/user-info.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'UserInfo', schema: UserInfoSchema }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
