import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../guards/role.decorateur';
import { Role } from '../user/interface/role';
import { AnnounceService } from './announce.service';
import { AnnounceEntity } from './entities/announce.entity';
import { CreateAnnounceDto } from './interface/create-announce.dto';
import { SearchQuery } from './interface/search-query.dto';

@Controller('announce')
export class AnnounceController {
  constructor(private announceService: AnnounceService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Teacher)
  createAnnounce(
    @Body() body: CreateAnnounceDto,
    @Req() { user },
  ): Promise<AnnounceEntity> {
    return this.announceService.createAnnounce({ ...body, userId: user.sub });
  }

  @Get('search')
  searchAnnounce(
    @Query() { levelName, subjectName }: SearchQuery,
  ): Promise<AnnounceEntity> {
    return this.announceService.searchAnnounce({ levelName, subjectName });
  }
}
