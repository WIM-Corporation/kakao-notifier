import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createPool, Factory, Options, Pool } from 'generic-pool';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class TypeOrmPoolFactory implements Factory<DataSource> {
  private readonly logger: Logger = new Logger(TypeOrmPoolFactory.name);
  private readonly dataSourceOption: DataSourceOptions;
  readonly poolOptions: Options;

  constructor(private readonly configService: ConfigService) {
    this.dataSourceOption = configService.get('db') as DataSourceOptions;
    this.poolOptions = {
      min: 2,
      max: 30,
      acquireTimeoutMillis: 20000,
      idleTimeoutMillis: 20000,
      autostart: true,
    };
  }

  async create(): Promise<DataSource> {
    // this.logger.verbose('create datasource');
    return await new DataSource(this.dataSourceOption).initialize();
  }

  async destroy(client: DataSource): Promise<void> {
    // this.logger.verbose('destroy datasource');
    await client.destroy();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(client: DataSource): Promise<boolean> {
    // this.logger.verbose('validate datasource');
    return client.isInitialized;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.dataSourceOption,
      extra: {
        connectionLimit: this.poolOptions.max,
      },
    };
  }

  createPool(): Pool<DataSource> {
    return createPool(this, this.poolOptions);
  }
}
