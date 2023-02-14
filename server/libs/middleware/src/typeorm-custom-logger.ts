import { Logger, QueryRunner } from 'typeorm';
import { PlatformTools } from 'typeorm/platform/PlatformTools';
import { Logger as NestLogger } from '@nestjs/common';

export class TypeORMCustomLogger implements Logger {
  private readonly logger: NestLogger = new NestLogger('SQL');

  logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    const sql = query + (parameters?.length ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}` : '');
    this.logger.log('query:', PlatformTools.highlightSql(sql));
  }

  logQueryError(error: string | Error, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    const sql = query + (parameters?.length ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}` : '');
    this.logger.error('query failed:', PlatformTools.highlightSql(sql));
    this.logger.error('error:', error);
  }

  logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    const sql = query + (parameters?.length ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}` : '');
    this.logger.warn(`query is slow, execution time: ${time}`, PlatformTools.highlightSql(sql));
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
    this.logger.log(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner | undefined) {
    this.logger.log(message);
  }

  log(level: 'log' | 'warn' | 'info', message: any, queryRunner?: QueryRunner | undefined) {
    // eslint-disable-next-line default-case
    switch (level) {
      case 'log':
        // this.logger.log(message);
        break;
      case 'info':
        // this.logger.log('INFO:', message);
        break;
      case 'warn':
        this.logger.warn(PlatformTools.warn(message));
        break;
    }
  }

  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
}
