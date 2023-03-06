import { AuthGuard } from '@libs/guard';
import { AuthUserInterceptor } from '@libs/interceptor';
import { applyDecorators, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Public } from './public.decorator';

export function Auth(options?: Partial<{ public: boolean }>): MethodDecorator {
  const isPublic = options?.public;

  return applyDecorators(
    UseGuards(AuthGuard({ public: isPublic })),
    ApiBearerAuth('jwt'),
    UseInterceptors(AuthUserInterceptor),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    Public(isPublic),
  );
}
