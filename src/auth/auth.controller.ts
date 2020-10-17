import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/types/auth.types';
import { UserDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decotator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Get('test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        return { user };
    }

    @Post('register')
    async register(@Body(ValidationPipe) userDTO: UserDTO): Promise<{ accessToken: string }> {
        return await this.authService.register(userDTO);
    }

    @Post('login')
    async login(@Body(ValidationPipe) userDTO: UserDTO): Promise<{ accessToken: string }> {
        return await this.authService.login(userDTO);

    }
}
