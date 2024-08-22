import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) { }

  @Post()
  async createDeck(@Body() createDeckDto: CreateDeckDto) {
    return this.decksService.createDeck(createDeckDto);
  }

  @Get('commander/:commanderName')
  async getCommander(@Param('commanderName') commanderName: string) {
    return this.decksService.fetchCommander(commanderName);
  }

  @Get('test')
  testRoute() {
    return { message: 'Test route working!' };
  }

  // @Post('generate')
  // async generateDeck(
  //   @Body('commanderName') commanderName: string,
  //   @Body('userId') userId: string,
  // ) {
  //   return this.decksService.generateDeck(commanderName, userId);
  // }

  @Get()
  async findAll() {
    return this.decksService.findAll();
  }
}
