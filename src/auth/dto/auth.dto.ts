import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class UserDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        { message: 'Password is to must contain two uppercase , one special case ,two digits , three lowercase letters' }
    )
    password: string;
}
