import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import typeorm from './config/typeorm';

@Module({
  imports: [
    FilesModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
