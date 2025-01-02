import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from 'schemas/chat.schema';
import { UserService } from 'src/user/user.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
        private readonly userService: UserService,
    ) {}

    async getChat(docId: string) {
        const chat = await this.chatModel.findOne({ docId: docId });

        if (!chat) return;

        const messages: any = chat.messages.map(mess => {
            return mess;
        });

        const result: any = messages.map(async (mess: any) => {
            const user = await this.userService.findById(mess.userId);
            return {
                id: mess._id,
                userId: mess.userId,
                username: user.name || 'Unknown',
                avatar: user.avatar,
                message: mess.message,
                time: mess.time
            }
        });

        return await Promise.all(result);
    }

    async createChat(docId: string, createData: CreateChatDto) {
        const data = { docId, messages: createData };
        await this.chatModel.create(data);
        return this.getChat(docId);
    }

    async updateChat(docId: string, updateData: UpdateChatDto) {
        const chat = await this.chatModel.findOne({ docId: docId });
        const messages = [...chat.messages, updateData];

        await this.chatModel.findByIdAndUpdate(chat._id, { messages: messages });

        return this.getChat(docId);
    }
}
