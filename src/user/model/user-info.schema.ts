import * as mongoose from 'mongoose';

export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher'
}

export const UserInfoSchema = new mongoose.Schema({

    role: {
        type: String,
        enum: [UserRole.STUDENT, UserRole.TEACHER]
    },
    standard: Number,
    mobileno: String,
    teachermail: String,
    userId: String
});



