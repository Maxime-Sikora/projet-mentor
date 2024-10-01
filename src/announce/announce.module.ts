import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelModule } from 'src/level/level.module';
import { SubjectModule } from 'src/subject/subject.module';
import { AnnounceController } from './announce.controller';
import { AnnounceService } from './announce.service';
import { AnnounceEntity } from './entities/announce.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnounceEntity]),
    LevelModule,
    SubjectModule,
  ],
  controllers: [AnnounceController],
  providers: [AnnounceService],
})
export class AnnounceModule {}
