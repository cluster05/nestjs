import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/auth/auth.types';

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        match: emailRegex
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [UserRole.STUDENT, UserRole.TEACHER]
    },
    standatd: String,
    mobileno: String,
});


UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (error) {
        return next(error);
    }
});
