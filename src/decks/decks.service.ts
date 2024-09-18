import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { DecksRepository } from './decks.repository';
import axios from 'axios';
import { Deck } from './schema/deck.schema';

export function sortedPossibilities(value: number): number {
  const possibilities = new Array<number>(0.75, 0.5, 0.25);
  const possibility = Math.floor(Math.random() * 3);
  return value * possibilities[possibility];
}

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

  async fetchCards(cardColor: Array<string>, quantityColor?: Array<number>) {
    if (quantityColor) {
      let index = -1;
      quantityColor.forEach(async () => {
        index++;
        console.log(
          'dentro do quantityColor foreach: ' +
          cardColor[index] +
          ' ' +
          quantityColor[index],
        );
        console.log(
          'retorno de uma fetchCards2: ' +
          (await this.fetchCards2(cardColor[index], quantityColor[index])),
        );
      });
      //console.log("buildedDeck: " + buildedDeck)
      //return buildedDeck
    }
    return this.fetchCards2(cardColor[0]);
  }

  async fetchCards2(cardColor: string, quantityColor?: number) {
    const cardsUrl = `https://api.magicthegathering.io/v1/cards?colorIdentity=${cardColor}`;
    const cardsResponse = await axios.get(cardsUrl);
    const cards = cardsResponse.data.cards;
    if (quantityColor) {
      console.log(
        'quantidade do slice fetch2: ' + cards.slice(0, quantityColor).length,
      );
      return cards.slice(0, quantityColor);
    }

    return cards;
  }

  async build(commanderName: string, userId: string) {
    const commander = await this.fetchCommander(commanderName);
    const colorQuantity = commander.colorIdentity.length;
    const cards = (
      colorQuantity > 1
        ? await this.generateQuantityColors(colorQuantity, commander)
        : await this.fetchCards(commander.colorIdentity)
    ).slice(0, 99);
    console.log('numero de cartas tem que ser 99: ' + cards.length);
    const deck = [commander, ...cards];

    const createDeckDto: CreateDeckDto = {
      commander: commander.name,
      cards: deck,
      userId: userId,
    };

    return this.createDeck(createDeckDto);
  }

  async generateQuantityColors(colorQuantity, commander) {
    console.log('caiu aquui');
    let cardQuantity = 99;
    let index = 0;
    const cardQuantityColors = new Array<number>(colorQuantity);
    let allowedColors = new Array<string>();
    allowedColors = commander.colorIdentity;
    console.log('allowedColors: ' + allowedColors);
    allowedColors.forEach((e) => {
      const logicForSorting = cardQuantity - colorQuantity + index;
      const valueForSorting = Math.floor(sortedPossibilities(logicForSorting));
      console.log('e[0] foreach: ' + e[0]);
      console.log('variavel contadora foreach: ' + index);
      console.log(
        'cardQuantity: ' + cardQuantity + 'colorQuantity: ' + colorQuantity,
      );
      console.log(logicForSorting);
      console.log(valueForSorting);
      let sortedNumber;
      if (allowedColors[allowedColors.length - 1] != e)
        sortedNumber = Math.floor(Math.random() * valueForSorting);
      else
        sortedNumber =
          99 -
          cardQuantityColors.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
      console.log('sortedNumber: ' + sortedNumber);
      cardQuantityColors[index] = sortedNumber;
      cardQuantity -= sortedNumber;
      index++;
    });
    console.log('final array cardQuantityColors: ' + cardQuantityColors);
    return await this.fetchCards(allowedColors, cardQuantityColors);
  }
}
