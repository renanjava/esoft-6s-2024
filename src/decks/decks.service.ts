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
    const cards = cardsResponse.data.cards.map((e, i = 0, existingCards = [""]) => {
      if (i < 100 && !e.name.includes(existingCards)) {
        i++
        existingCards.push(e.name)
        return e
      }

    });
    console.log(cards.length)
  }
}
