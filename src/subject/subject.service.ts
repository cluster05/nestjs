import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectDTO } from './subject.dto';
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

    async create(subjectDTO: SubjectDTO): Promise<Subject> {
        const subject = await new this.subjectModel(subjectDTO).save();
        return subject;
    }

    async patch(id: string, subjectDTO: SubjectDTO): Promise<Subject> {
        const subject = await this.subjectModel.findByIdAndUpdate(id, subjectDTO, { new: true });
        if (!subject) {
            throw new HttpException(`Subject Not Found`, HttpStatus.NOT_FOUND);
        }
        return subject;
    }

    async delete(id: string): Promise<void> {
        const subject = await this.subjectModel.findByIdAndDelete(id);
        if (!subject) {
            throw new HttpException(`Subject Not Found`, HttpStatus.NOT_FOUND);
        }
    }

}
