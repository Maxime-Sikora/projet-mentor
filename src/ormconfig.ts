import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AnnounceEntity } from './announce/entities/announce.entity';
import { CourseEntity } from './course/entities/course.entity';
import { LevelEntity } from './level/entities/level.entity';
import { SubjectEntity } from './subject/entities/subject.entity';
import { UserEntity } from './user/entities/user.entity';

config();

const options: DataSourceOptions = {
  //@ts-expect-error ignore error type for the database type
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrations: ['./dist/migration/*.js'],
  entities: [
    SubjectEntity,
    LevelEntity,
    AnnounceEntity,
    UserEntity,
    CourseEntity,
  ],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...options,
  synchronize: false,
};

export const connectionSource = new DataSource(options);
