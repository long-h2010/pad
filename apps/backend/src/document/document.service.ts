import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from 'schemas/document.schema';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UsersRoleDto } from './dto/users-role.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document.name) private docModel: Model<Document>,
        private readonly userService: UserService,
    ) {}

    async findDocsOwner(userId: string) {
        const query = {
            owners: userId,
            isDeleted: false
        };

        return await this.docModel.find(query);
    }

    async findDocsShareWithMe(userId: string) {
        const docsWriter = await this.docModel.find({ writers: userId, isDeleted: false });
        const docsReader = await this.docModel.find({ readers: userId, isDeleted: false });
        const docs = [...docsWriter, ...docsReader];
        return docs;
    }

    async create(userId: string, createDocDto: CreateDocumentDto) {
        const data = {
            ...createDocDto,
            owners: userId
        }
        const doc = await this.docModel.create(data);
        return doc;
    }

    async findOne(id: string) {
        const doc = await this.docModel.findById(id);
        if (!doc || doc === null) throw new NotFoundException('Document Not Found');
        return doc;
    }

    async getListUser(docId: string) {
        const doc = await this.findOne(docId);

        const result: any = {
            owners: await Promise.all(doc.owners.map(async (id: any) => {
                const user = await this.userService.findById(id);
                return {
                    name: user.name,
                    nickname: user.nickname,
                    avatar: user.avatar
                }
            })),
            writers: await Promise.all(doc.writers.map(async (id: any) => {
                const user = await this.userService.findById(id);
                return {
                    name: user.name,
                    nickname: user.nickname,
                    avatar: user.avatar
                }
            })),
            readers: await Promise.all(doc.readers.map(async (id: any) => {
                const user = await this.userService.findById(id);
                return {
                    name: user.name,
                    nickname: user.nickname,
                    avatar: user.avatar
                }
            }))
        };

        return result;
    }

    async update(id: string, updateDocDto: UpdateDocumentDto) {
        const doc = await this.docModel.findByIdAndUpdate(id, updateDocDto);
        return doc;
    }

    async addUsersRole(docId: string, role: string, addUsersDto: UsersRoleDto) {
        const doc = await this.findOne(docId);

        const usersId = [...doc[role].map((id: string) => id), ...addUsersDto.users];

        const users = Array.from(new Set(usersId));

        const docUpdateOwner = await this.docModel.findByIdAndUpdate(docId, { [role]: users });
        return docUpdateOwner;
    }

    async deleteUsersRole(docId: string, role: string, delUsersDto: UsersRoleDto) {
        const doc = await this.findOne(docId);

        const users = [...doc[role].filter((id: string) => !delUsersDto.users.includes(id))];

        const docUpdateOwner = await this.docModel.findByIdAndUpdate(docId, { [role]: users });
        return docUpdateOwner;
    }

    async updateUsersRole(docId: string, nicknames: any) {
        const query = {
            owners: await Promise.all(nicknames.owners.map(async (nickname: string) => {
                return await this.userService.getIdByNickname(nickname)
            })),
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
}
