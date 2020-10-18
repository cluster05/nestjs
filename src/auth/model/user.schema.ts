import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        match: emailRegex
    },
    password: {
        type: String,
        required: true,
    },

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
