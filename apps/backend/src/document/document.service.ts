import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from 'schemas/document.schema';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UserService } from 'src/user/user.service';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document.name) private docModel: Model<Document>,
        private readonly userService: UserService,
        private readonly historyService: HistoryService
    ) {}

    async totalDocuments() {
        return await this.docModel.find({ isDeleted: false }).countDocuments();
    }

    async findAll(userId: string) {
        const query = {
            $or: [
                { owner: userId },
                { writers: userId },
                { readers: userId }
            ],
            isDeleted: false
        };

        const docs = await this.docModel.find(query).sort({ 'updatedAt': -1 });

        return docs.map((doc: any) => ({ ...doc._doc, isShared: !doc.owner.equals(userId) }));
    }

    async findDocsOwner(userId: string) {
        const query = {
            owner: userId,
            isDeleted: false
        };

        return await this.docModel.find(query).sort({ 'updatedAt': -1 });
    }

    async findDocsShared(userId: string) {
        const query = {
            $or: [
                { writers: userId },
                { readers: userId }
            ],
            isDeleted: false
        };

        return await this.docModel.find(query).sort({ 'updatedAt': -1 });
    }

    async findDeletedDocs(userId: string) {
        const query = {
            owner: userId,
            isDeleted: true
        };

        return await this.docModel.find(query).sort({ 'updatedAt': -1 });
    }

    async searchDocs(userId: string, option: string, value: string) {
        const regex = RegExp(value, 'i');

        let optionSearch = {};
        if (option === 'all') {
            optionSearch = {
                $or: [
                    { owner: userId },
                    { writers: userId },
                    { readers: userId }
                ]
            };
        } else if (option === 'owner') {
            optionSearch = { owner: userId };
        } else if (option === 'shared') {
            optionSearch = {
                $or: [
                    { writers: userId },
                    { readers: userId }
                ]
            };
        }

        const query = {
            $and: [
                optionSearch,
                {
                    $or: [                   
                        { name: { $regex: regex } },
                        { tags: { $regex: regex } }
                    ]
                }
            ],
            isDeleted: false
        };

        return await this.docModel.find(query).sort({ 'updatedAt': -1 });
    }

    async create(userId: string, createDocDto: CreateDocumentDto) {
        const data = {
            ...createDocDto,
            owner: userId
        }
        const doc = await this.docModel.create(data);
        return doc;
    }

    async findOne(id: string) {
        const doc = await this.docModel.findById(id);
        if (!doc || doc === null) throw new NotFoundException('Document Not Found');
        return doc;
    }

    async getDocName(docId: string) {
        const doc = await this.findOne(docId);
        return doc.name;
    }

    async getUsersAndRole(docId: string) {
        const doc = await this.findOne(docId);

        const owner = await this.userService.findById(doc.owner as any);

        const result: any = {
            owner: {
                id: owner._id,
                name: owner.name,
                nickname: owner.nickname,
                avatar: owner.avatar
            },
            writers: await Promise.all(doc.writers.map(async (id: any) => {
                const user = await this.userService.findById(id);
                return {
                    id: user._id,
                    name: user.name,
                    nickname: user.nickname,
                    avatar: user.avatar
                }
            })),
            readers: await Promise.all(doc.readers.map(async (id: any) => {
                const user = await this.userService.findById(id);
                return {
                    id: user._id,
                    name: user.name,
                    nickname: user.nickname,
                    avatar: user.avatar
                }
            }))
        };

        return result;
    }

    async getAllUsersInDoc(docId: string) {
        const users: any = await this.getUsersAndRole(docId);
        
        return [
            users.owner.id, 
            ...users.writers.map((user: any) => user.id), 
            ...users.readers.map((user: any) => user.id)
        ];
    }

    async update(docId: string, userId: string, updateDocDto: UpdateDocumentDto) {
        await this.findOne(docId);

        if (updateDocDto.content) await this.historyService.updateDocHistory(docId, userId, updateDocDto.content);

        await this.docModel.findByIdAndUpdate(docId, updateDocDto);
        return { message: 'Update document successful' };
    }

    async applyOperation(docId: string, userId: string, operation: { position: number; text: string }) {
        const doc = await this.findOne(docId);
        const content = doc.content;

        const newContent = content.slice(0, operation.position) + operation.text + content.slice(operation.position + operation.text.length - 1);
        console.log(`dau: ${content.slice(0, operation.position)}, text: ${operation.text}, duoi: ${content.slice(operation.position+operation.text.length - 1)}`)
        await this.update(docId, userId, { content: content });
        // console.log('dau',content.slice(0, operation.position))

        return newContent;
      }

    async restore(docId: string) {
        await this.findOne(docId);
        
        await this.docModel.findByIdAndUpdate(docId, { isDeleted: false });
        return { message: 'Restore document successful' };
    }

    async delete(docId: string, userId: string) {
        const doc = await this.findOne(docId);

        if (!(doc.owner as any).equals(userId)) 
            throw new HttpException('Bạn cần phải là Người sở hữu để có thể xóa tài liệu', 500);

        await this.docModel.findByIdAndUpdate(docId, { isDeleted: true });
        return { message: 'Delete document successful' };
    }

    async updateRole(docId: string, nicknames: any) {
        const query = {
            owner: await this.userService.getIdByNickname(nicknames.owner),
            writers: await Promise.all(nicknames.writers.map(async (nickname: string) => {
                return await this.userService.getIdByNickname(nickname)
            })),
            readers: await Promise.all(nicknames.readers.map(async (nickname: string) => {
                return await this.userService.getIdByNickname(nickname)
            }))
        };

        const doc = await this.docModel.findByIdAndUpdate(docId, query);
        if (doc) return { message: 'Update role successful' };
    }

    async getRoleOfUser(docId: string, userId: string) {
        const doc = await this.findOne(docId);
        
        if ((doc.owner as any).equals(userId)) return 'owner';
        else if ((doc.writers as any).includes(userId)) return 'writer';
        else return 'reader';
    }
}
