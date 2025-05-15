import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { filesProviders } from './providers/files.provider';
import { DatabaseModule } from 'src/database/database.module';
import { DriveService } from 'src/drive/drive.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FilesController],
  providers: [FilesService, ...filesProviders, DriveService],
})
export class FilesModule {}
