import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { Payload } from 'src/types/payload.types';
import { UserDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() userDTO: UserDTO) {
        const user = await this.userService.register(userDTO);
        const payload: Payload = {
            email: user.email,
        };
        const accessToken = await this.authService.signPayload(payload);
        return { accessToken };
    }

    @Post('login')
    async login(@Body() userDTO: UserDTO) {
        const user = await this.userService.login(userDTO);
        const payload: Payload = {
            email: user.email,
        };
        const accessToken = await this.authService.signPayload(payload);
        return { accessToken };
    }
}
