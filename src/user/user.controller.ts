import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decotator';
import { User } from 'src/auth/types/auth.types';
import { UserInfoDTO } from './dto/user-info.dto';
import { UserService } from './user.service';

@Controller('user/info')
@UseGuards(AuthGuard())
@UsePipes(ValidationPipe)
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    async getUser(@GetUser() user: User) {
        const userId = user._id;
        return await this.userService.getUser(userId);
    }

    @Patch()
    async updateUser(@Body() userInfoDTO: UserInfoDTO, @GetUser() user: User) {
        const userId = user._id;
        return await this.userService.updateUser(userInfoDTO, userId);
    }


}
