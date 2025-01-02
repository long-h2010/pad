import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from 'schemas/notification.schema';
import { SendNotificationDto } from './dto/send-notification.dto';
import { UserService } from 'src/user/user.service';
import { DocumentService } from 'src/document/document.service';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name) private notificationModel: Model<Notification>,
        private readonly userService: UserService,
        private readonly docService: DocumentService
    ) {}

    async getAllNotification(userId: string) {
        return await this.notificationModel.find({ to: userId }).sort({ 'createdAt': -1 });
    }

    async sendNotification(userId: string, sendNotificationDto: SendNotificationDto) {
        const { to, type, docId } = sendNotificationDto;

        let sendTo = [];

        if (to) sendTo = await Promise.all(to.map(async (nickname: string) => await this.userService.getIdByNickname(nickname)));

        const from = await this.userService.getNicknameById(userId);
        const docName = await this.docService.getDocName(docId);

        let title = '';
        let description = '';
        if (type == 'add') {
            title = 'Bạn được thêm vào tài liệu'
            description = `${docName} bởi ${from}`;
        } else if (type == 'message') {
            await this.notificationModel.deleteMany({ to: { $ne: userId }, docId: docId, type: type });
            const usersInDoc = await this.docService.getAllUsersInDoc(docId);
            
            sendTo = usersInDoc.filter((user: any) => !user._id.equals(userId));
            title = 'Bạn có tin nhắn mới'
            description = `trong tài liệu ${docName}`;
        }

        sendTo.forEach(async (user) => {
            const data = {
                from: userId,
                to: user,
                title: title,
                description: description,
                docId: docId,
                type: type
            };

            await this.notificationModel.create(data);
        });

        return { message: 'Send notification successfully' };
    }

    async update(userId: string) {
        return await this.notificationModel.updateMany({ to: userId }, { isReaded: true });
    }
}
