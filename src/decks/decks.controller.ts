import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { JwtAuthGuard } from '@/auth/jwt.guard';
import { Roles } from '@/role/decorator/role.decorator';
import { Role } from '@/role/enum/role.enum';
import { RolesGuard } from '@/auth/roles.guard';
import { CacheKey } from '@nestjs/cache-manager';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generateDeck(
    @Body('commanderName') commanderName: string,
    @Req() req: Request,
  ) {
    return this.decksService.build(commanderName, req);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return this.decksService.findAll();
  }

  @Get('/sem-cache/my-decks')
  @UseGuards(JwtAuthGuard)
  async findByLoggedUser(@Req() req: Request) {
    return this.decksService.findByLoggedUser(req);
  }

  @Get('/com-cache/my-decks')
  @CacheKey('usuarioDecks')
  @UseGuards(JwtAuthGuard)
  async findByLoggedUserWithCache(@Req() req: Request) {
    return this.decksService.findByLoggedUserWithCache(req);
  }
}
