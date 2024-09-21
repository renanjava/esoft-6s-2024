import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;

    try {
      const user = await this.jwtService.verifyAsync(token);
      request.user = user; // Adicione isso para garantir que o usuário é anexado à requisição
      console.log('Decoded JWT:', user);
      return true;
    } catch (error) {
      console.error('JWT verification failed:', error);
      return false;
    }
  }
}
