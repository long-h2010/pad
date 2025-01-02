import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { UserService } from 'src/user/user.service';
import { DocumentService } from 'src/document/document.service';

@Injectable()
export class CloudinaryService {
    constructor(
        private readonly userService: UserService,
        private readonly docService: DocumentService
    ) {
        v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }

    async deleteOldImg(url: string) {
        const publicId = 'pad/' + url.split('/').pop().split('.')[0];

        return new Promise((resolve, reject) => {
            v2.uploader.destroy(publicId, { resource_type: 'image' }, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        });
    }

    async uploadAvatar(userId: string, file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({ folder: 'pad' }, async (error, result) => {
                if (error) return reject(error);
                
                const oldImg = (await this.userService.findById(userId)).avatar;
                if (oldImg) await this.deleteOldImg(oldImg);

                this.userService.updateInfor(userId, { avatar: result.url });
                resolve(result);
            });

            toStream(file.buffer).pipe(upload);
        });
    }

    async uploadThumbnail(docId: string, userId: string, file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({ folder: 'pad' }, async (error, result) => {
                if (error) return reject(error);

                const oldThumbnail = (await this.docService.findOne(docId)).thumbnail;
                if (oldThumbnail) await this.deleteOldImg(oldThumbnail);

                this.docService.update(docId, userId, { thumbnail: result.url });
                resolve(result);
            });

            toStream(file.buffer).pipe(upload);
        });
    }
}
