import type { User } from '@api/modules/user';
import { ContextProvider } from '@libs/middleware';
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const user = <User>request.user;
    ContextProvider.setAuthUser(user);

    return next.handle();
  }
}
