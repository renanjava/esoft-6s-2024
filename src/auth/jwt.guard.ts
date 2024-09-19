import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        return context.switchToHttp().getRequest();
      }
    
      handleRequest(err, user) {
        if (err || !user) {
          throw new UnauthorizedException();
        }
        return user; 
      }
}
