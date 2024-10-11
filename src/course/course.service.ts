import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnounceService } from 'src/announce/announce.service';
import { PaymentService } from 'src/payment/payment.service';
import { Role } from 'src/user/interface/role';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { CourseStatus } from './entities/course.enum';

@Injectable()
export class CourseService {
  constructor(
    private userService: UserService,
    private announceService: AnnounceService,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    private paymentService: PaymentService,
  ) {}
  async createCourse({
    userId,
    announceId,
    date,
    hours,
    paymentMethod,
  }: {
    userId: number;
    announceId: number;
    date: Date;
    hours: number;
    paymentMethod: string;
  }): Promise<CourseEntity> {
    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }

    const announce = await this.announceService.findOneById(announceId);

    if (!announce) {
      throw new HttpException(`announce not found`, HttpStatus.NOT_FOUND);
    }

    const paymentIntent = await this.paymentService.createPayment(
      paymentMethod,
      announce.price * 100,
    );

    if (!paymentIntent) {
      throw new HttpException(
        `payment not created`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const course = await this.courseRepository.save({
      student: user,
      announce,
      date,
      hours,
      status: CourseStatus.PENDING,
      paymentIntent: paymentIntent.id,
    });

    return course;
  }

  async updateCourse({ courseId }: { courseId: number }) {
    const course = await this.courseRepository.findOne({
      where: {
        id: courseId,
      },
      relations: {
        announce: true,
      },
    });

    if (!course) {
      throw new HttpException(`course not find`, HttpStatus.NOT_FOUND);
    }

    await this.paymentService.capturePayment(
      course.paymentIntent,
      course.announce.price * 100,
    );

    const updatedCourse = await this.courseRepository.save({
      ...course,
      status: CourseStatus.DONE,
    });

    return updatedCourse;
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
