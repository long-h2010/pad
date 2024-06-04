import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatSevice: ChatService) {}

    @Post(':docId')
    async createChat(@Param('docId') docId: string, @Body() message: any) {
        return this.chatSevice.createChat(docId, message);
    }

    @Put(':docId')
    async updateChat(@Param('docId') docId: string, @Body() updateChatDto: UpdateChatDto) {
        return this.chatSevice.updateChat(docId, updateChatDto);
    }
}
