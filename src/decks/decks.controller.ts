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

  @Get('create-deck/:commanderName')
  async getNewDeck(@Param('commanderName') commanderName: string) {
    const commander = await this.decksService.fetchCommander(commanderName);
    const cards = this.decksService.fetchCards(commander.colorIdentity[0]);
    return commander + cards;
  }

  @Get('cards')
  async getCardsColor(@Body('cardColor') cardColor: string) {
    return
  }

  @Get('test')
  testRoute() {
    return { message: 'Test route working!' };
  }

  @Post('generate')
  async generateDeck(
    @Body('commanderName') commanderName: string,
    @Body('userId') userId: string,
  ) {
    return this.decksService.build(commanderName, userId);
  }

  @Get()
  async findAll() {
    return this.decksService.findAll();
  }
}
