import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
