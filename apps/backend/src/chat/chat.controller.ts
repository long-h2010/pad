import { Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/auth/utils/guard';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatSevice: ChatService) {}

    @Post(':docId')
    @UseGuards(AuthGuard)
    async createChat(@Param('docId') docId: string, @Request() req: any) {
        const userId = req.user.id;
        const { message } = req.body;

        const messageData: CreateChatDto = {
            userId: userId,
            message: message
        }

        return this.chatSevice.createChat(docId, messageData);
    }

    @Put(':docId')
    @UseGuards(AuthGuard)
    async updateChat(@Param('docId') docId: string, @Request() req: any) {
        const userId = req.user.id;
        
        const updateData: UpdateChatDto = {
            userId: userId,
            message: req.body.message,
            time: Date.now()
        };

        return this.chatSevice.updateChat(docId, updateData);
    }

    @Get(':docId')
    async getChat(@Param('docId') docId: string) {
        return this.chatSevice.getChat(docId);
    }
}
