import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from 'schemas/chat.schema';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name)
        private chatModel: Model<Chat>
    ) {}

    async createChat(docId: string, message: any) {
        const data = { docId, messages: message };
        const chat = await this.chatModel.create(data);
        return chat;
    }

    async findChat(docId: string) {
        return await this.chatModel.findOne({ docId: docId });
    }

    async updateChat(docId: string, updateChatDto: UpdateChatDto) {
        const chat = await this.findChat(docId);
        const messages = [ ...chat.messages, updateChatDto ];
        console.log(messages)
        return await this.chatModel.findByIdAndUpdate(chat._id, { messages: messages });
    }
}
