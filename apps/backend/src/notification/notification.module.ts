import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { DocumentService } from 'src/document/document.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HistoryService } from 'src/history/history.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [NotificationService, UserService, DocumentService, JwtService, HistoryService]
})
export class NotificationModule {}
