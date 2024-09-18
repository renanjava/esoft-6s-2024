import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CardDto } from './cards.dto';
import { DeckDto } from './deck.dto';

export class CreateDeckDto extends DeckDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDto)
  cards?: CardDto[];
}
