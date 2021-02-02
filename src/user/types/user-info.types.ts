import { Document } from "mongoose";
import { UserRole } from "../model/user-info.schema";


export class UserInfo extends Document {
    role: UserRole;
    standard: string;
    mobileno: string;
    teachermail: string;
}
