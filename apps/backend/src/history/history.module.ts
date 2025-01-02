import { DocumentService } from './../document/document.service';
import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { DatabaseModule } from 'database/database.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoryController],
  providers: [HistoryService, DocumentService, UserService]
})
export class HistoryModule {}
