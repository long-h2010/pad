import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentService } from './document.service';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UsersRoleDto } from './dto/users-role.dto';

@Controller('document')
export class DocumentController {
    constructor(private readonly docSevice: DocumentService) {}

    @Get(':userId')
    async findDocsOwner(@Param('userId') userId) {
        return this.docSevice.findDocsOwner(userId)
    }

    @Post(':userId')
    async create(@Param('userId') userId: string, @Body(ValidationPipe) createDocDto: CreateDocumentDto) {
        return this.docSevice.create(userId, createDocDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body(ValidationPipe) updateDocDto: UpdateDocumentDto) {
        return this.docSevice.update(id, updateDocDto);
    }

    @Put('add-users/:role/:docId')
    async addOwner(@Param('role') role: string, @Param('docId') docId: string, @Body(ValidationPipe) addUsers: UsersRoleDto) {
        return this.docSevice.addUsersRole(role, docId, addUsers);
    }

    @Put('delete-users/:role/:docId')
    async deleteOwner(@Param('role') role: string, @Param('docId') docId: string, @Body(ValidationPipe) delUsersDto: UsersRoleDto) {
        return this.docSevice.deleteUsersRole(role, docId, delUsersDto);
    }
}
