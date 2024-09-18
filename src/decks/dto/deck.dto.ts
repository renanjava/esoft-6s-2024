import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';

export abstract class DeckDto {
    @IsString()
    @IsNotEmpty()
    commander: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
