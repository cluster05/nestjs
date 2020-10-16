import { IsNotEmpty } from "class-validator";

export class SubjectDTO {

    @IsNotEmpty()
    title: string;
}