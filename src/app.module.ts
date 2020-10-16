import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    SubjectModule,
    MongooseModule.forRoot('mongodb://localhost:eshell')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
