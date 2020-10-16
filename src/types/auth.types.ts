import { Document } from "mongoose";

export enum UserRole {
    STUDENT = "student",
    TEACHER = "teacher"
}

export class User extends Document {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    standatd: string;
    mobileno: string;
}


