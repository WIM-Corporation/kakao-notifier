import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { StringField, URLField } from '@wim-backend/api-property';
import { IsOptional } from 'class-validator';
import { IsImageFile, IsVideoFile } from './additional-validator.decorator';

interface IStringFieldOptions {
  minLength?: number;
  maxLength?: number;
  toLowerCase?: boolean;
  toUpperCase?: boolean;
  swagger?: boolean;
}

export function VideoFileField(options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {}): PropertyDecorator {
  return applyDecorators(StringField(options), IsVideoFile());
}

export function VideoFileFieldOptional(options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {}): PropertyDecorator {
  return applyDecorators(IsOptional(), VideoFileField({ required: false, ...options }));
}

export function ImageFileField(options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {}): PropertyDecorator {
  return applyDecorators(StringField(), IsImageFile());
}

export function ImageFileFieldOptional(options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {}): PropertyDecorator {
  return applyDecorators(IsOptional(), ImageFileField({ required: false, ...options }));
}
