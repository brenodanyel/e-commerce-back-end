import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AWS_S3_HELPER } from 'src/helpers/awsS3Upload';

@Injectable()
export class UploadService {
  constructor(private readonly awsS3Helper: AWS_S3_HELPER) {}

  async uploadFile(file: Express.Multer.File) {
    const url = await this.awsS3Helper.uploadFile({
      file: {
        data: file.buffer,
        mimetype: file.mimetype,
        name: file.originalname,
      },
      fileId: randomUUID(),
    });

    return {
      url,
    };
  }
}
