import { ERole } from '@libs/constant';
import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Roles = (...roles: (ERole | 'ALL')[]): CustomDecorator => SetMetadata('roles', roles);
