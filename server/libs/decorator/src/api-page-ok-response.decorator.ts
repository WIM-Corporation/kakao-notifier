import { CursorPageDto, OffsetPageDto } from '@libs/meta';
import type { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export function ApiOffsetPageOkResponse<T extends Type>(options: { type: T; description?: string }): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(OffsetPageDto),
    ApiExtraModels(options.type),
    ApiOkResponse({
      description: options.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(OffsetPageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        ],
      },
    }),
  );
}

export function ApiCursorPageOkResponse<T extends Type>(options: { type: T; description?: string }): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(CursorPageDto),
    ApiExtraModels(options.type),
    ApiOkResponse({
      description: options.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(CursorPageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        ],
      },
    }),
  );
}
