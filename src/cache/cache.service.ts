import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  // Função para listar os baralhos sem cache
  async listarBaralhos() {
    const response = await axios.get(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
    );
    return response.data;
  }

  // Função para listar os baralhos com cache
  async listarBaralhosComCache() {
    const response = await axios.get(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
    );
    return response.data;
  }
}
