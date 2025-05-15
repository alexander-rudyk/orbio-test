import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class FilesUploadDTO {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  urls: string[];
}
