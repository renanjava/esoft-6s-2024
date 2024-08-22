import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { DecksRepository } from './decks.repository';
import axios from 'axios';
import { Deck } from './schema/deck.schema';

@Injectable()
export class DecksService {
  constructor(private readonly deckRepository: DecksRepository) { }

  async createDeck(createDeckDto: CreateDeckDto): Promise<Deck> {
    return this.deckRepository.create(createDeckDto);
  }

  async findAll(): Promise<Deck[]> {
    return this.deckRepository.findAll();
  }

  async fetchCommander(commanderName: string): Promise<any> {
    const commanderUrl = `https://api.magicthegathering.io/v1/cards?name=${commanderName}&supertypes="Legendary"`;
    const commanderResponse = await axios.get(commanderUrl);
    const commander = commanderResponse.data.cards[0];
    return commander;
  }

  async fetchCards(cardColor: string) {
    const cardsUrl = `https://api.magicthegathering.io/v1/cards?colorIdentity=${cardColor}`;
    const cardsResponse = await axios.get(cardsUrl);
    const cards = cardsResponse.data.cards.slice(0, 99);
    return cards;
  }

  async build(commanderName: string, userId: string) {
    const commander = await this.fetchCommander(commanderName);
    const allowedColor = commander.colorIdentity.join(',');
    const cards = await this.fetchCards(allowedColor);

    const deck = [commander, ...cards];

    const createDeckDto: CreateDeckDto = {
      commander: commander.name,
      cards: deck,
      userId: userId,
    }

    return this.createDeck(createDeckDto);

  }
}
