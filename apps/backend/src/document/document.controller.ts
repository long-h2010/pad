import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentService } from './document.service';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { AuthGuard } from 'src/auth/utils/guard';

@Controller('document')
export class DocumentController {
    constructor(private readonly docSevice: DocumentService) {}

    @Get('all')
    @UseGuards(AuthGuard)
    async findAll(@Request() req: any) {
        const user = req.user;
        return this.docSevice.findAll(user.id);
    }

    @Get('owner')
    @UseGuards(AuthGuard)
    async findDocsOwner(@Request() req: any) {
        const user = req.user;
        return this.docSevice.findDocsOwner(user.id);
    }

    @Get('shared')
    @UseGuards(AuthGuard)
    async findDocsShared(@Request() req: any) {
        const user = req.user;
        return this.docSevice.findDocsShared(user.id);
    }

    @Get('deleted')
    @UseGuards(AuthGuard)
    async findDeletedDocs(@Request() req: any) {
        const user = req.user;
        return this.docSevice.findDeletedDocs(user.id);
    }

    @Get('total-documents')
    async getTotalDocuments() {
        return this.docSevice.totalDocuments();
    }

    @Get('search/:option/:value')
    @UseGuards(AuthGuard)
    async searchDocs(@Request() req: any, @Param('option') option: string, @Param('value') value: string) {
        const user = req.user;
        return this.docSevice.searchDocs(user.id, option, value);
    }

    @Post('create')
    @UseGuards(AuthGuard)
    async create(@Request() req: any) {
        const user = req.user;
        let createDocDto: CreateDocumentDto = req.body.data;

        if (!createDocDto)
            createDocDto = { name: 'Tài liệu không có tiêu đề', content: '' }
        
        return this.docSevice.create(user.id, createDocDto);
    }

    @Get(':docId')
    async getDocById(@Param('docId') docId: string) {
        return this.docSevice.findOne(docId);
    }

    @Put(':docId')
    @UseGuards(AuthGuard)
    async update(@Param('docId') docId: string, @Request() req: any) {
        const userId = req.user.id;
        const updateDocDto: UpdateDocumentDto = req.body.data;
        return this.docSevice.update(docId, userId, updateDocDto);
    }

    @Put('restore/:docId')
    @UseGuards(AuthGuard)
    async restore(@Param('docId') docId: string) {
        return this.docSevice.restore(docId);
    }

    @Delete(':docId')
    @UseGuards(AuthGuard)
    async delete(@Param('docId') docId: string, @Request() req: any) {
        const userId = req.user.id;
        return this.docSevice.delete(docId, userId);
    }

    @Get('get-list-user/:docId')
    async getUsersAndRole(@Param('docId') docId: string) {
        return this.docSevice.getUsersAndRole(docId);
    }

    @Put(':docId/update-role')
    async updateUsersRole(@Param('docId') docId: string, @Body('nicknames') nicknames: any) {
        return this.docSevice.updateRole(docId, nicknames);
    }

    @Get(':docId/get-role')
    @UseGuards(AuthGuard)
    async getRoleOfUser(@Param('docId') docId: string, @Request() req: any) {
        const userId = req.user.id;
        return this.docSevice.getRoleOfUser(docId, userId);
    }
}
