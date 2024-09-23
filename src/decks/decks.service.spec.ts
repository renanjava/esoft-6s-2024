import { sortedPossibilities } from './decks.service';

describe('Funções externas da classe DecksService', () => {
  it('Deve sortear uma probabilidade de 75% ou 50% ou 25%', () => {
    expect([7.5, 5, 2.5]).toContain(sortedPossibilities(10));
  });
});
