import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DatabaseModule } from 'database/database.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { HistoryService } from 'src/history/history.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DocumentController],
  providers: [DocumentService, JwtService, UserService, HistoryService]
})
export class DocumentModule {}
