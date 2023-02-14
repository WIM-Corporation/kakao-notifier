import { EOauthProvider, EOauthProviderProps } from '@libs/constant';
import { ValueTransformer } from 'typeorm';

export class EOauthProviderTransformer implements ValueTransformer {
  to(value: any): EOauthProviderProps {
    return value;
  }

  from(databaseValue: EOauthProviderProps): EOauthProvider | undefined {
    return EOauthProvider.find(databaseValue) ?? undefined;
  }
}
