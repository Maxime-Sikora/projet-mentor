import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnounceModule } from './announce/announce.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelModule } from './level/level.module';
import { typeOrmModuleOptions } from './ormconfig';
import { SubjectModule } from './subject/subject.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    SubjectModule,
    LevelModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
    CacheModule.register(),
    AnnounceModule,
    UserModule,
    AuthModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
