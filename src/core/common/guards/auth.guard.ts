import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { envs } from 'src/config/envs';
import { UserState } from 'src/core/user/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenToValidate = this.extractTokenFromHeader(request);
    if (!tokenToValidate) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.jwtService.verify(tokenToValidate, {
        secret: envs.jwtSecret,
      });

      if (user.userState === UserState.BLOCKED)
        throw new UnauthorizedException();

      request['user'] = user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
