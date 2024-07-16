import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ 
    cors: { origin: [process.env.FE_URL] }
})
export class EventsGateway implements OnModuleInit {
    @WebSocketServer() sever: Server;

    onModuleInit() {
        this.sever.on('connection', socket => {
            console.log('Connected', socket.id);
        });
    }

    @SubscribeMessage('edit')
    handleEditText(@MessageBody() body: any) {
        this.sever.emit('updateText', body.content);
    }

    @SubscribeMessage('send')
    handleSendMessage(@MessageBody() body: any) {
        this.sever.emit('send', body.data);
    }
}