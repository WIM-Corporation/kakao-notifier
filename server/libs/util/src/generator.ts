import bcrypt from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

export class Generator {
  static uuid(): string {
    return uuidV4();
  }

  static fileName(ext: string): string {
    return `${Generator.uuid()}.${ext}`;
  }

  static generateVerificationCode(): string {
    return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
  }

  static generateRandomString(length: number): string {
    return Math.random()
      .toString(36)
      .replace(/[^\dA-Za-z]+/g, '')
      .slice(0, Math.max(0, length));
  }

  static hash(value: string): string {
    return bcrypt.hashSync(value, 10);
  }
}
