import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

const {
  USE_AWS_REGION = '',
  USE_AWS_S3_BUCKET = '',
  USE_AWS_ACCESS_KEY_ID = '',
  USE_AWS_SECRET_ACCESS_KEY = '',
} = process.env;

const client: S3 = new S3({
  region: USE_AWS_REGION,
  credentials: {
    accessKeyId: USE_AWS_ACCESS_KEY_ID,
    secretAccessKey: USE_AWS_SECRET_ACCESS_KEY,
  },
});

@Injectable()
export class AWS_S3_HELPER {
  constructor() {}

  async uploadFile(params: {
    file: {
      name: string;
      data: Buffer;
      mimetype: string;
    };
    fileId: string;
  }) {
    const extension = params.file.name.split('.').at(-1);

    const date = new Date();
    date.setSeconds(new Date().getSeconds() + 5);

    const result = await client
      .upload({
        ACL: 'public-read',
        Bucket: USE_AWS_S3_BUCKET,
        Body: params.file.data,
        Key: `/${params.fileId}.${extension}?${Date.now()}`,
        ContentType: params.file.mimetype,
        Expires: date,
      })
      .promise();

    return result.Location;
  }

  async deleteFile(params: { fileName: string }) {
    const result = await client
      .deleteObject({
        Bucket: USE_AWS_S3_BUCKET,
        Key: `/${decodeURIComponent(params.fileName)}`,
      })
      .promise();

    return result;
  }
}
