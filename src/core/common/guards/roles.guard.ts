/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/core/user/domain/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  allowedRoles: string[] = ['admin'];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user?.role) {
      throw new UnauthorizedException('Unauthorized');
    }

    const hasRole = this.allowedRoles.includes(user.role);
    if (!hasRole) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'You no have permission',
        message: 'Call to admin',
      });
    }

    return true;
  }
}
