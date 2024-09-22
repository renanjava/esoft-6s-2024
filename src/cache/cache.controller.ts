import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'; // Importação correta
import { AppService } from './cache.service';

@Controller()
@UseInterceptors(CacheInterceptor) // Ativa o cache para este controlador
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Rota sem cache
  @Get('/baralhos/sem-cache')
  async listarSemCache() {
    const data = await this.appService.listarBaralhos();
    return { source: 'No Cache', data };
  }

  // Rota com cache (TTL de 5 segundos)
  @Get('/baralhos/com-cache')
  @CacheKey('baralhos') // Define a chave do cache
  @CacheTTL(5) // TTL de 5 segundos para esta rota
  async listarComCache() {
    const data = await this.appService.listarBaralhosComCache();
    return { source: 'Cache', data };
  }
}
