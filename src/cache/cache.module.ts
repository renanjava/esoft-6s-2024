import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './cache.controller';
import { AppService } from './cache.service';

@Module({
  imports: [
    // O TTL padrão para todas as rotas será de 5 segundos (5000 milissegundos)
    CacheModule.register({
      ttl: 5,  // TTL em segundos
      max: 100, // Máximo de itens no cache
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
