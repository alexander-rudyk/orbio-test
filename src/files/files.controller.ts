import { Body, Controller, Get, Post } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesUploadDTO } from './dtos/files.upload.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  async uploadFromUrls(@Body() dto: FilesUploadDTO) {
    return this.filesService.uploadFromUrls(dto);
  }

  @Get()
  async list() {
    return this.filesService.getList();
  }
}
