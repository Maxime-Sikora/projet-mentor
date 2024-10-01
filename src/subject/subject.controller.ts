import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SubjectEntity } from './entities/subject.entity';
import { AddSubjectDto } from './interface/addSubject.dto';
import { FindOneParams } from './interface/find-one-params.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  @Get()
  findAll(): Promise<SubjectEntity[]> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOneById(
    @Param('id', ParseIntPipe) { id }: FindOneParams,
  ): Promise<SubjectEntity> {
    return this.subjectService.findOneById(id);
  }

  @Post()
  addSubject(@Body() subject: AddSubjectDto): Promise<SubjectEntity> {
    return this.subjectService.createNewSubject(subject);
  }
}
