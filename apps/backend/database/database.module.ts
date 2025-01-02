import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from 'schemas/chat.schema';
import { DocumentSchema } from 'schemas/document.schema';
import { UserSchema } from 'schemas/user.schema';
import { NotificationSchema } from 'schemas/notification.schema';
import { config } from 'dotenv';
import { HistorySchema } from 'schemas/history.schema';

config();
    
@Module({
    imports: [
        MongooseModule.forRoot(process.env.DB_URI),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]),
        MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
        MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
        MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }])
    ],
    exports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]),
        MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
        MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
        MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }])
    ]
})
export class DatabaseModule {}
