import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectController } from './subject.controller';
import { SubjectSchema } from './subject.schema';
import { SubjectService } from './subject.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Subject', schema: SubjectSchema }
        ])
    ],
    controllers: [SubjectController],
    providers: [SubjectService],
})
export class SubjectModule { }
