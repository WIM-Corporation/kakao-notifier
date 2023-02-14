/* eslint-disable import/no-extraneous-dependencies */
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configuration } from './../libs/config/src/configuration';

dotenv.config();
const ormconfig = async (): Promise<DataSource> => {
  const config = <{ db: DataSourceOptions }>await configuration();

  return new DataSource({
    ...config.db,
    entities: [`${__dirname}/../apps/api/src/**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../apps/api/src/**/*.entity.{js,ts}`],
  });
};

// eslint-disable-next-line import/no-default-export
export default ormconfig();
