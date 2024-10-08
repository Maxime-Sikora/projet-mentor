import { Type } from 'class-transformer';
import { IsNumber, Max, Min, ValidateNested } from 'class-validator';
import { AddLevelDto } from '../../level/interface/addLevel.dto';
import { AddSubjectDto } from '../../subject/interface/addSubject.dto';

export class CreateAnnounceDto {
  @ValidateNested()
  @Type(() => AddLevelDto)
  level: AddLevelDto;
  @ValidateNested()
  @Type(() => AddSubjectDto)
  subject: AddSubjectDto;
  @IsNumber()
  @Min(0)
  @Max(150)
  price: number;
}
