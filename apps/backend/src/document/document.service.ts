import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from 'schemas/document.schema';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UsersRoleDto } from './dto/users-role.dto';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document.name)
        private docModel: Model<Document>
    ) {}

    async findDocsOwner(userId: string) {
        return await this.docModel.find({ owners: userId });
    }

    async findDocsShareWithMe(userId: string) {
        const docsWriter = await this.docModel.find({ writers: userId });
        const docsReader = await this.docModel.find({ readers: userId });
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

    async update(id: string, updateDocDto: UpdateDocumentDto) {
        const doc = await this.docModel.findByIdAndUpdate(id, updateDocDto);
        return doc;
    }

    async addUsersRole(role: string, docId: string, addUsersDto: UsersRoleDto) {
        const doc = await this.docModel.findById(docId);

        const usersRole = role + 's';
        const usersId = [...doc[usersRole].map(id => id.toString()), ...addUsersDto.users];

        const users = Array.from(new Set(usersId));

        const docUpdateOwner = await this.docModel.findByIdAndUpdate(docId, { [usersRole]: users });
        return docUpdateOwner;
    }

    async deleteUsersRole(role: string, docId: string, delUsersDto: UsersRoleDto) {
        const doc = await this.docModel.findById(docId);

        const usersRole = role + 's';
        const users = [...doc[usersRole].filter(id => !delUsersDto.users.includes(id.toString()))];

        const docUpdateOwner = await this.docModel.findByIdAndUpdate(docId, { [usersRole]: users });
        return docUpdateOwner;
    }
}
