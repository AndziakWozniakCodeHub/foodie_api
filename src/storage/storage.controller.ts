import {
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../iam/authentication/enums/auth-type.enum';
import { StorageService } from './storage.service';

@Auth(AuthType.None)
@Controller('upload')
export class StorageController {
  constructor(private readonly uploadService: StorageService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // ... Set of file validator instances here
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.uploadService.uploadFile(file);
  }
}
