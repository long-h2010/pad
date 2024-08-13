import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from 'database/database.module';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { EventsModule } from './events/events.module';
import { ChatModule } from './chat/chat.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    DocumentModule,
    EventsModule,
    ChatModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
