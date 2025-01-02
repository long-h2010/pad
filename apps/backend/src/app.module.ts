import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from 'database/database.module';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { SocketModule } from './socket/socket.module';
import { ChatModule } from './chat/chat.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NotificationModule } from './notification/notification.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    DocumentModule,
    SocketModule,
    ChatModule,
    CloudinaryModule,
    NotificationModule,
    HistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
