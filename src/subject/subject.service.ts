import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectDto } from './dto/subject.dto';
import { Subject } from './subject.type';

@Injectable()
export class SubjectService {

    constructor(@InjectModel('Subject') private subjectModel: Model<Subject>) { }

    async readAll(): Promise<Subject[]> {
        return await this.subjectModel.find();
    }

    async search(search: string): Promise<Subject[]> {
        const searchRegex = { $regex: '.*' + search + '.*' };
        return await this.subjectModel.find({ title: searchRegex });
    }

    async create(subjectDto: SubjectDto): Promise<Subject> {
        const subject = await new this.subjectModel(subjectDto).save();
        return subject;
    }

    async patch(id: string, subjectDto: SubjectDto): Promise<Subject> {
        const subject = await this.subjectModel.findByIdAndUpdate(id, subjectDto, { new: true });
        return subject;
    }

    async delete(id: string): Promise<void> {
        await this.subjectModel.findByIdAndDelete(id);
    }

}
