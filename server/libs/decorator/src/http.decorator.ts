import { ERole } from '@libs/constant';
import { AuthGuard, RolesGuard } from '@libs/guard';
import { AuthUserInterceptor } from '@libs/interceptor';
import { applyDecorators, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Public } from './public.decorator';

export function Auth(roles: ERole[] = [], options?: Partial<{ public: boolean }>): MethodDecorator {
  const isPublic = options?.public;

  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard({ public: isPublic }), RolesGuard),
    ApiBearerAuth('jwt'),
    UseInterceptors(AuthUserInterceptor),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    Public(isPublic),
  );
}
