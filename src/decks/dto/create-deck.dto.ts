import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CardDto } from './cards.dto';

export class CreateDeckDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDto)
  cards?: CardDto[];

  @IsString()
  @IsNotEmpty()
  commander: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
