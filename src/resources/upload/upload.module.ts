import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { AWS_S3_HELPER } from 'src/helpers/awsS3Upload';

@Module({
  controllers: [UploadController],
  providers: [UploadService, AWS_S3_HELPER],
})
export class UploadModule {}
