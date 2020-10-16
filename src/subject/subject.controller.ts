import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SubjectDto } from './dto/subject.dto';
import { SubjectService } from './subject.service';
import { Subject } from './subject.type';

@Controller('subject')
export class SubjectController {

    constructor(private subjectService: SubjectService) { }

    @Get()
    async readAll(): Promise<Subject[]> {
        return await this.subjectService.readAll();
    }

    @Get('search')
    async search(@Query('search') search: string): Promise<Subject[]> {
        return await this.subjectService.search(search);
    }

    @Post()
    async create(@Body() subjectDto: SubjectDto): Promise<Subject> {
        return this.subjectService.create(subjectDto);
    }

    @Patch(':id')
    async patch(
        @Param('id') id: string,
        @Body() subjectDto: SubjectDto): Promise<Subject> {
        return this.subjectService.patch(id, subjectDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.subjectService.delete(id);
    }

}
