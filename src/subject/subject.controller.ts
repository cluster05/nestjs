import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubjectDTO } from './subject.dto';
import { SubjectService } from './subject.service';
import { Subject } from './subject.type';
import { AuthGuard } from '@nestjs/passport';

@Controller('subject')
@UseGuards(AuthGuard())
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
    @UsePipes(ValidationPipe)
    async create(@Body() subjectDTO: SubjectDTO): Promise<Subject> {
        return this.subjectService.create(subjectDTO);
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async patch(
        @Param('id') id: string,
        @Body() subjectDto: SubjectDTO): Promise<Subject> {
        return this.subjectService.patch(id, subjectDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.subjectService.delete(id);
    }

}
