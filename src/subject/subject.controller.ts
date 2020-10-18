import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubjectDTO } from './dto/subject.dto';
import { SubjectService } from './subject.service';
import { Subject } from './types/subject.type';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decotator';
import { User } from 'src/auth/types/auth.types';

@Controller('subject')
export class SubjectController {

    constructor(private subjectService: SubjectService) { }

    @Get('all')
    async readAll(): Promise<Subject[]> {
        return await this.subjectService.readAll();
    }

    @Get()
    @UseGuards(AuthGuard())
    async readAllOfUser(@GetUser() user: User): Promise<Subject[]> {
        const userId = user._id;
        console.log(userId);

        return await this.subjectService.readByUserId(userId);
    }

    @Get('search')
    async search(@Query('search') search: string): Promise<Subject[]> {
        return await this.subjectService.search(search);
    }

    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async create(@Body() subjectDTO: SubjectDTO, @GetUser() user: User): Promise<Subject> {
        const userId = user._id;
        return this.subjectService.create(subjectDTO, userId);
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async patch(
        @Param('id') id: string,
        @Body() subjectDto: SubjectDTO,
        @GetUser() user: User
    ): Promise<Subject> {
        const userId = user._id;
        return this.subjectService.patch(id, subjectDto, userId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async delete(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        const userId = user._id;
        return this.subjectService.delete(id, userId);
    }

}
