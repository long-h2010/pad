import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { DatabaseModule } from 'database/database.module';
import { DocumentService } from 'src/document/document.service';
import { HistoryService } from 'src/history/history.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, JwtService, UserService, DocumentService, HistoryService],
})
export class CloudinaryModule {}
