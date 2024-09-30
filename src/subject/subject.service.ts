import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { LevelSubjectInterface } from 'src/level/level';
import { Repository } from 'typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { InterfacePostSubject } from './subject';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async findAll(): Promise<SubjectEntity[]> {
    const subjectCache =
      await this.cacheManager.get<SubjectEntity[]>('findAll');
    if (!subjectCache) {
      const subjects = await this.subjectRepository.find();
      await this.cacheManager.set('findAll', subjects, 0); // ici on met 0 pour l'exemple sinon le cache ne reste pas assez longtemps
      return subjects;
    }
    return subjectCache;
  }

  findOneById(id: number): Promise<SubjectEntity> {
    return this.subjectRepository.findOneBy({ id });
  }

  async createNewSubject({
    name,
  }: InterfacePostSubject): Promise<SubjectEntity> {
    const newSubject = await this.subjectRepository.save({ name });
    return newSubject;
  }

  async levelAndSubjectFromName(name: string): Promise<LevelSubjectInterface> {
    const subject = await this.subjectRepository.findOneBy({ name });
    return {
      subject: {
        id: subject.id,
        name: subject.name,
      },
      level: {
        id: subject.level.id,
        name: subject.level.name,
      },
    };
  }
}
