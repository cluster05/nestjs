import { IsIn, IsNotEmpty, Max, Min } from "class-validator";
import { UserRole } from "../model/user-info.schema";

export class UserInfoDTO {

    @IsNotEmpty()
    @IsIn([UserRole.STUDENT, UserRole.TEACHER])
    role: string;

    @IsNotEmpty()
    standatd: number;

    @IsNotEmpty()
    mobileno: string;

    teachermail: string;
}