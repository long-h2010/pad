import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
    @WebSocketServer() sever: Server;

    onModuleInit() {
        this.sever.on('connection', socket => {
            console.log('Connected', socket.id);
        });
    }
}