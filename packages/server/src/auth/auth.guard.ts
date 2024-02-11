import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

/*
 * How to use this class?
 * Example: Use it in xxx.controller.ts
 * @Post("0")
 * @Roles(['role name here'])
 * async feature's name (@Body() xxx) {} ...
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwtService: JwtService) {}
  private readonly logger = new Logger(AuthGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const { headers } = context.switchToHttp().getRequest();

    if (!headers.authorization) {
      this.logger.log('No authorization header found');
      return false;
    }

    const token = headers.authorization.split(' ')[1] || '';

    try {
      const decodedToken = this.jwtService.verify(token);
      const roles = this.reflector.get<number[]>('roles', context.getHandler());
      if (!roles || roles.length === 0) {
        return true;
      }
      const usersAuthorization = decodedToken.role;
      if (!roles.map((role) => this.checkRole(role, usersAuthorization)).includes(true)) {
        this.logger.log('User does not have the required role');
        return false;
      }
      return true;
    } catch (err) {
      this.logger.error('Authenticating user failed', err);
      return false;
    }
  }

  checkRole(role: number, usersAuthorization: number): boolean {
    return (role & usersAuthorization) !== 0;
  }
}
