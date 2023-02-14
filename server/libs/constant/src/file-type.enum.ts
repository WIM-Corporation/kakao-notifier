/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';
import { extname } from 'path';
import { parse } from 'url';

export type EFileTypeProps = 'VIDEO' | 'IMAGE';

@Enum('code')
export class EFileType extends EnumType<EFileType>() {
  static readonly VIDEO: EFileType = new EFileType('VIDEO', ['mp4']);

  static readonly IMAGE: EFileType = new EFileType('IMAGE', ['jpg', 'jpeg', 'png']);

  private constructor(private readonly _code: EFileTypeProps, private readonly _fileExtensions: string[]) {
    super();
  }

  get code(): EFileTypeProps {
    return this._code;
  }

  validate(url: string): boolean {
    const extension = extname(parse(url).pathname!).replace('.', '').toLowerCase(); // '.jpg'
    return this._fileExtensions.includes(extension.toLowerCase());
  }
}
