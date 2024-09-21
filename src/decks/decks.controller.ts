import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DecksService } from './decks.service';
import { JwtAuthGuard } from '@/auth/jwt.guard';
import { FetchDeckDto } from './dto/fetch-deck.dto';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get('create-deck/:commanderName')
  async getNewDeck(@Param('commanderName') commanderName: string) {
    const commander = await this.decksService.fetchCommander(commanderName);
    const cards = this.decksService.fetchCards(commander.colorIdentity[0]);
    return commander + cards;
  }

  @Post('generate')
  async generateDeck(@Body() fetchDeckDto: FetchDeckDto) {
    return this.decksService.build(fetchDeckDto.commander, fetchDeckDto.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.decksService.findAll();
  }
}
