import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  public serializeUser(user: any, done: (err: Error | null, data?: any) => void): void {
    done(null, user);
  }

  public deserializeUser(data: any, done: (err: Error | null, user?: any) => void): void {
    try {
      done(null, data);
    } catch (err) {
      done(<Error>err);
    }
  }
}
