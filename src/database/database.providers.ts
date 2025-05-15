import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DATA_SOURCE_KEY } from './constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE_KEY,
    useFactory: async (configService: ConfigService) => {
      const dbConfig = configService.getOrThrow('typeorm');
      const dataSource = new DataSource(dbConfig);

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
