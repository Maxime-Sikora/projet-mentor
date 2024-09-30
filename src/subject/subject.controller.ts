import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LevelSubjectInterface } from 'src/level/level';
import { SubjectEntity } from './entities/subject.entity';
import { InterfacePostSubject } from './subject';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  @Get()
  findAll(): Promise<SubjectEntity[]> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<SubjectEntity> {
    return this.subjectService.findOneById(+id);
  }

  @Get(':name/level')
  findLevelAndSubject(
    @Param('name') name: string,
  ): Promise<LevelSubjectInterface> {
    return this.subjectService.levelAndSubjectFromName(name);
  }

  @Post()
  addSubject(@Body() subject: InterfacePostSubject): Promise<SubjectEntity> {
    return this.subjectService.createNewSubject(subject);
  }
}
