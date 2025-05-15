import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { FilesUploadDTO } from './dtos/files.upload.dto';
import { FILES_REPO_KEY } from './providers/files.provider';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/files.entity';
import { DriveService } from 'src/drive/drive.service';

@Injectable()
export class FilesService {
  constructor(
    @Inject(FILES_REPO_KEY)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly driveService: DriveService,
  ) {}

  async uploadFromUrls(dto: FilesUploadDTO) {
    const results = [];

    for (const url of dto.urls) {
      const response = await axios.get(url, {
        responseType: 'stream',
      });

      const fileName = url.split('/').pop();
      const mimeType = response.headers['content-type'];

      const driveFile = await this.driveService.uploadFileFromStream(
        response.data,
        fileName,
        mimeType,
      );

      const saved = await this.fileRepository.save({
        name: fileName,
        mimeType,
        driveUrl: driveFile.webViewLink,
        driveId: driveFile.id,
      });

      results.push(saved);
    }

    return results;
  }

  async getList() {
    return this.fileRepository.find();
  }
}
