/* eslint-disable @typescript-eslint/naming-convention */
import { NotFoundException } from '@nestjs/common';
import { Enum, EnumType } from 'ts-jenum';

export type EOauthProviderProps = 'KAKAO' | 'GOOGLE' | 'FACEBOOK' | 'APPLE' | 'UNAUTHORIZED';

@Enum('code')
export class EOauthProvider extends EnumType<EOauthProvider>() {
  static readonly KAKAO: EOauthProvider = new EOauthProvider('KAKAO', '카카오', undefined);
  static readonly GOOGLE: EOauthProvider = new EOauthProvider('GOOGLE', '구글', 'google.com');
  static readonly FACEBOOK: EOauthProvider = new EOauthProvider('FACEBOOK', '페이스북', 'facebook.com');
  static readonly APPLE: EOauthProvider = new EOauthProvider('APPLE', '애플', 'apple.com');
  static readonly UNAUTHORIZED: EOauthProvider = new EOauthProvider('UNAUTHORIZED', '미인증', undefined);

  private constructor(private readonly _code: EOauthProviderProps, private readonly _name: string, private readonly _token?: string) {
    super();
  }

  get code(): EOauthProviderProps {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get token(): string | undefined {
    return this._token;
  }

  equals(code: string | EOauthProviderProps | EOauthProvider): boolean {
    if (typeof code === 'string') {
      return code === this.code;
    }
    return this === code;
  }

  static findToken(token: string): EOauthProvider {
    const selectedProvider = this.values().find((v) => v.token === token);
    if (!selectedProvider) throw new NotFoundException('oauth provider 조회 실패');
    return selectedProvider;
  }

  static pick(...props: EOauthProviderProps[]): EOauthProvider[] {
    return this.values().filter((e) => props.map((v) => v.toString()).includes(e.code));
  }

  static omit(...props: EOauthProviderProps[]): EOauthProvider[] {
    return this.values().filter((e) => !props.map((v) => v.toString()).includes(e.code));
  }

  static asString(): string[] {
    return this.values().map((v) => v.code.toString());
  }
}
