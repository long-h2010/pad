import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { UserService } from 'src/user/user.service';

@Injectable()
export class CloudinaryService {
    constructor(private readonly userService: UserService) {
        v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }

    async uploadImage(userId: string, file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({ folder: 'pad' }, (error, result) => {
                if (error) return reject(error);
                console.log(result)
                this.userService.updateInfor(userId, { avatar: result.url });
                resolve(result);
            });

            toStream(file.buffer).pipe(upload);
        });
    }
}
