import { ERole, ERoleProps } from '@libs/constant';
import { ValueTransformer } from 'typeorm';

export class ERoleTransformer implements ValueTransformer {
  to(value: string | ERole): ERoleProps {
    if (typeof value === 'string') return ERole.valueOf(value).code;
    return value.code;
  }

  from(databaseValue: ERoleProps): ERole | undefined {
    return ERole.find(databaseValue) ?? undefined;
  }
}
