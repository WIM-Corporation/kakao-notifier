import { User } from '@api/modules/user/domain/user.entity';
import { getValue, setValue } from 'express-ctx';

export class ContextProvider {
  private static readonly nameSpace: string = 'request';

  private static readonly authUserKey: string = 'user_key';

  static setAuthUser(user: User): void {
    ContextProvider.set(ContextProvider.authUserKey, user);
  }

  static getAuthUser(): Optional<User> {
    return ContextProvider.get<User>(ContextProvider.authUserKey);
  }

  private static get<T>(key: string): Optional<T> {
    return getValue<T>(ContextProvider.getKeyWithNamespace(key));
  }

  private static set(key: string, value: any): void {
    setValue(ContextProvider.getKeyWithNamespace(key), value);
  }

  private static getKeyWithNamespace(key: string): string {
    return `${ContextProvider.nameSpace}.${key}`;
  }
}
