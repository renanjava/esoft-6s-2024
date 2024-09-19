import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  private readonly adminRole = 'admin'; 
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);

    super.canActivate(context);

    if (user && user.role === this.adminRole) {
      return true;
    }

    throw new ForbiddenException('Você não tem permissão para acessar esta rota. Somente admins');
  }
}