import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AnnounceEntity } from 'src/announce/entities/announce.entity';
import { LevelEntity } from 'src/level/entities/level.entity';
import { SubjectEntity } from 'src/subject/entities/subject.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'mentor',
  migrations: ['./dist/migration/*.js'],
  entities: [SubjectEntity, LevelEntity, AnnounceEntity],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...options,
  synchronize: true,
};

export const connectionSource = new DataSource(options);
