import { Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/auth/utils/guard';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationSevice: NotificationService) {}

    @Get('get-notifications')
    @UseGuards(AuthGuard)
    async getAllNotification(@Request() req: any) {
        const userId = req.user.id;
        return this.notificationSevice.getAllNotification(userId);
    }

    @Post('send-notification')
    @UseGuards(AuthGuard)
    async sendNotification(@Request() req: any) {
        const userId = req.user.id;
        const sendNotificationDto: SendNotificationDto = req.body.data;
        
        return this.notificationSevice.sendNotification(userId, sendNotificationDto);
    }

    @Put('readed')
    @UseGuards(AuthGuard)
    async readAllNotification(@Request() req: any) {
        const userId = req.user.id;
        return this.notificationSevice.update(userId);
    }
}
