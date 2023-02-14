import { ERole } from '@libs/constant';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { isEmpty } from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<ERole[]>('roles', [context.getHandler(), context.getClass()]);
    const isPublic = this.extractMetadata<boolean>(context, 'isPublic');

    if (isPublic || isEmpty(roles)) return true;
    const request = this.getRequest(context);
    if (!request.isAuthenticated()) return false;

    const { user } = request;
    if (!user) return false;

    return roles.some((v) => v.equals(user.role));
  }

  private getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest<Request>();
  }

  private extractMetadata<T>(context: ExecutionContext, key: string): T {
    return this.reflector.getAllAndOverride<T>(key, [context.getHandler(), context.getClass()]);
  }
}
