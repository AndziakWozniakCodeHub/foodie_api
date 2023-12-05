import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
  private readonly bucket = 'foodie-storage';
  private readonly storage = new Storage({ projectId: 'arboreal-lane-407019' });

  async getBuckets() {
    const [buckets] = await this.storage.getBuckets();
    console.log('Buckets:');

    for (const bucket of buckets) {
      console.log(`- ${bucket.name}`);
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const bucket = this.storage.bucket(this.bucket);
    const filename = `meals/${Date.now()}`;
    const fileUpload = bucket.file(`meals/${Date.now()}`);
    await pipeline(
      Readable.from(file.buffer),
      fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      }),
    );
    return `https://storage.cloud.google.com/${this.bucket}/${filename}`;
  }
  async delete(path: string) {
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }
}
