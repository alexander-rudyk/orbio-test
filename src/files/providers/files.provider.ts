import { DataSource } from 'typeorm';
import { FileEntity } from '../entities/files.entity';
import { DATA_SOURCE_KEY } from 'src/database/constants';

export const FILES_REPO_KEY = 'FILES_REPO';

export const filesProviders = [
  {
    provide: FILES_REPO_KEY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FileEntity),
    inject: [DATA_SOURCE_KEY],
  },
];
