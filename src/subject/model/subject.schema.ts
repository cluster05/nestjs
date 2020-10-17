import * as mongoose from 'mongoose';

export const SubjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: String
})