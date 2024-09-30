import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelModule } from './level/level.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    SubjectModule,
    LevelModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
