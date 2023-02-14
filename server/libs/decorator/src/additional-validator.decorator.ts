import { EFileType } from '@libs/constant';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsVideoFile(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object, propertyName: string | symbol) => {
    registerDecorator({
      propertyName: propertyName.toString(),
      name: 'IsVideoFile',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return value ? EFileType.VIDEO.validate(value) : true;
        },
        defaultMessage(): string {
          return 'invalid video file';
        },
      },
    });
  };
}

export function IsImageFile(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object, propertyName: string | symbol) => {
    registerDecorator({
      propertyName: propertyName.toString(),
      name: 'IsImageFile',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return value ? EFileType.IMAGE.validate(value) : true;
        },
        defaultMessage(): string {
          return 'invalid image file';
        },
      },
    });
  };
}
