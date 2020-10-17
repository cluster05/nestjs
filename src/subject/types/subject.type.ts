import { Document } from "mongoose";

export class Subject extends Document {
    title: string
    userId: string
}
