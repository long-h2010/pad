import { Body, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DocumentService } from 'src/document/document.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
    cors: { origin: [process.env.FE_URL] }
})
export class SocketGateway implements OnModuleInit {
    constructor(private jwtService: JwtService,
        private docService: DocumentService,
        private userService: UserService
    ) {}

    @WebSocketServer() sever: Server;
    private usersOnline: string[] = [];
    private usersPointers: any[] = [];

    onModuleInit() {
        this.sever.on('connection', socket => {
            console.log('Connected', socket.id);
        });
    }

    @SubscribeMessage('login')
    async handleLogin(@MessageBody() token: any) {
        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
        this.usersOnline.push(payload.id);
        this.usersOnline = [...new Set(this.usersOnline)];
        console.log(this.usersOnline)
        this.sever.emit('online', this.usersOnline);
    }

    @SubscribeMessage('join-document')
    handleJoinDocument(client: Socket, docId: string) {
        client.join(docId);
        console.log(`Client ${client.id} joined document ${docId}`);
    }

    @SubscribeMessage('leave-document')
    handleLeaveDocument(client: Socket, docId: string) {
        client.leave(docId);
        this.usersPointers[docId] = [];
        console.log(`Client ${client.id} left document ${docId}`);
    }

    @SubscribeMessage('edit')
    async handleEditText(@MessageBody() body: any) {
        const docId = body.docId;

        // const content = await this.docService.applyOperation(docId, userId, body.operation);
        
        const data: any = {
            content: body.operation.text,
            pointers: this.usersPointers[docId]
        };

        this.sever.to(docId).emit('update-text', { content: body.operation.text });
    }

    @SubscribeMessage('send-pointer')
    async handleUpdatePointer(@Body() body: any) {
        const payload = await this.jwtService.verifyAsync(body.pointer.userId, { secret: process.env.JWT_SECRET });
        const docId = body.docId;
        const userId = payload.id;
        const userName = await this.userService.getNicknameById(userId);

        if (this.usersPointers[docId]) {
            let flag = false;
            for (let i in this.usersPointers[docId]) {
                if (this.usersPointers[docId][i].userId === userId) {
                    this.usersPointers[docId][i].name = userName;
                    this.usersPointers[docId][i].position = body.pointer.pointer;
                    flag = true;   
                    break;
                }
            }

            if (!flag) this.usersPointers[docId].push({ userId: userId, position: body.pointer.pointer })
        } else {
            this.usersPointers[docId] = [{ userId: userId, position: body.pointer.pointer }]
        }

        this.sever.to(docId).emit('update-pointers', { pointers: this.usersPointers[docId] });
    }

    @SubscribeMessage('send')
    handleSendMessage(@MessageBody() body: any) {
        this.sever.emit('send', body.data);
    }
}