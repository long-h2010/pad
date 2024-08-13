import { Body, Controller, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentService } from './document.service';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UsersRoleDto } from './dto/users-role.dto';
import { AuthGuard } from 'src/auth/utils/guard';

@Controller('document')
export class DocumentController {
    constructor(private readonly docSevice: DocumentService) {}

    @Get('')
    @UseGuards(AuthGuard)
    async findDocsOwner(@Request() req: any) {
        const user = req.user;
        return this.docSevice.findDocsOwner(user.id);
    }

    @Post('create')
    @UseGuards(AuthGuard)
    async create(@Request() req: any) {
        const user = req.user;

        const createDocDto: CreateDocumentDto = {
            name: 'Tài liệu không có tiêu đề',
            content: ''
        }
        
        return this.docSevice.create(user.id, createDocDto);
    }

    @Get(':docId')
    async getDocById(@Param('docId') docId: string) {
        return this.docSevice.findOne(docId);
    }

    @Put(':docId')
    async update(@Param('docId') docId: string, @Body(ValidationPipe) updateDocDto: UpdateDocumentDto) {
        return this.docSevice.update(docId, updateDocDto);
    }

    @Get('get-list-user/:docId')
    async getListUser(@Param('docId') docId: string) {
        return this.docSevice.getListUser(docId);
    }

    @Put(':docId/update-role')
    async updateUsersRole(@Param('docId') docId: string, @Body('nicknames') nicknames: any) {
        return this.docSevice.updateUsersRole(docId, nicknames);
    }
}
