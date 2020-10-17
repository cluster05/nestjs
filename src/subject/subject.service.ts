import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectDTO } from './dto/subject.dto';
import { Subject } from './types/subject.type';

@Injectable()
export class SubjectService {

    constructor(@InjectModel('Subject') private subjectModel: Model<Subject>) { }

    async readAll(): Promise<Subject[]> {
        const subjects = await this.subjectModel.find();

        return subjects.map(subject => {
            return this.depopulateUserId(subject);
        });
    }

    async search(search: string): Promise<Subject[]> {
        const searchRegex = { $regex: '.*' + search + '.*' };
        const subjects = await this.subjectModel.find({ title: searchRegex });

        return subjects.map(subject => {
            return this.depopulateUserId(subject);
        });
    }

    async create(subjectDTO: SubjectDTO, userId: string): Promise<Subject> {
        const data = {
            ...subjectDTO,
            userId
        };
        const subject = await new this.subjectModel(data).save();
        return this.depopulateUserId(subject);
    }

    async patch(id: string, subjectDTO: SubjectDTO, userId: string): Promise<Subject> {
        const subject = await this.subjectModel.findByIdAndUpdate(id, subjectDTO, { new: true });
        if (!subject) {
            throw new HttpException(`Subject Not Found`, HttpStatus.NOT_FOUND);
        }

        if (subject.userId == userId) {
            return this.depopulateUserId(subject);
        } else {
            throw new HttpException('You dont have aceess for any change', HttpStatus.UNAUTHORIZED)
        }
    }

    async delete(id: string, userId: string): Promise<void> {
        const isSubjectExist = await this.subjectModel.findById(id);
        if (!isSubjectExist) {
            throw new HttpException(`Subject Not Found`, HttpStatus.NOT_FOUND);
        }
        if (isSubjectExist.userId == userId) {
            await this.subjectModel.findByIdAndDelete(id);
        } else {
            throw new HttpException('You dont have aceess for any change', HttpStatus.UNAUTHORIZED)
        }
    }

    depopulateUserId(subject: Subject): Subject {
        const depopule = subject.toObject();
        delete depopule['userId'];
        return depopule;
    }

}
