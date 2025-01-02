import { Controller, Get, Param, Put } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Get(':docId')
    async getDocHistory(@Param('docId') docId: string) {
        return this.historyService.getAllDocVersions(docId);
    }

    @Put(':docId/restore-version/:version')
    async restoreDocVersion(@Param('docId') docId: string, @Param('version') version: number) {
        return this.historyService.restoreDocVersion(docId, version);
    }
}
