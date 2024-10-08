import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnounceService } from 'src/announce/announce.service';
import { Role } from 'src/user/interface/role';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    private userService: UserService,
    private announceService: AnnounceService,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {}
  async createCourse({
    userId,
    announceId,
    date,
    hours,
  }: {
    userId: number;
    announceId: number;
    date: Date;
    hours: number;
  }): Promise<CourseEntity> {
    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }

    const announce = await this.announceService.findOneById(announceId);

    if (!announce) {
      throw new HttpException(`announce not found`, HttpStatus.NOT_FOUND);
    }

    const course = await this.courseRepository.save({
      student: user,
      announce,
      date,
      hours,
    });

    return course;
  }

  async findCourses(userId: number): Promise<CourseEntity[]> {
    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }
    if (user.role === Role.Teacher) {
      const teacherAnnounce = await this.announceService.findAllByUser(user);
      return teacherAnnounce.flatMap(({ courses }) => courses);
    }

    return this.courseRepository.findBy({
      student: user,
    });
  }
}
