import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { JwtService } from '@nestjs/jwt';
import { DocumentService } from 'src/document/document.service';
import { DatabaseModule } from 'database/database.module';
import { UserService } from 'src/user/user.service';
import { HistoryService } from 'src/history/history.service';

@Module({
    imports: [DatabaseModule],
    providers: [SocketGateway, JwtService, DocumentService, UserService, HistoryService]
})
export class SocketModule {}
