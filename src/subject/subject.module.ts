import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectController } from './subject.controller';
import { SubjectSchema } from '../model/subject.schema';
import { SubjectService } from './subject.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Subject', schema: SubjectSchema }
        ]),
        AuthModule
    ],
    controllers: [SubjectController],
    providers: [SubjectService],
})
export class SubjectModule { }
