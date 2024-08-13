import { Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/utils/guard';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
    constructor(private readonly cloudinarySevice: CloudinaryService) {}

    @Post('/update-avatar')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar', {}))
    async updateAvatar(@Request() req: any, @UploadedFile() file: Express.Multer.File) {
        const user = req.user;
        return this.cloudinarySevice.uploadImage(user.id, file);
    }
}