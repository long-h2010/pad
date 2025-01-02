import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History } from 'schemas/history.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class HistoryService {
    constructor(
        @InjectModel(History.name) private historyModel: Model<History>,
        private userService: UserService
    ) {}

    async findByDocId(docId: string) {
        return await this.historyModel.findOne({ docId: docId });
    }

    async getAllDocVersions(docId: string) {
        const history = await this.findByDocId(docId);
        
        const versions = await Promise.all(history.versions.map(async (ver: any) => {
            const users = await Promise.all(ver.editors.map(async (editor: any) => {
                const user = await this.userService.findById(editor);
                return {
                    avatar: user.avatar,
                    name: user.name
                }
            }));
           
            return {
                content: ver.content,
                editors: users,
                time: ver.time,
            };
        }));

        return versions;
    }

    async updateDocHistory(docId: string, userId: string, content: string) {
        const history = await this.findByDocId(docId);

        if (!history) {
            const data = {
                docId: docId,
                versions: { content: content, editors: userId }
            };

            await this.historyModel.create(data);
        } else {
            const lastVersion = history.versions[0];

            if ((Date.now() - lastVersion.time) > 3 * 60 * 60 * 1000) {
                const newVersion = { content: content, editors: userId };
                const versions = [newVersion, ...history.versions];

                await this.historyModel.updateOne({ docId: docId }, { versions: versions });
            } else {
                history.versions[0].content = content;
                history.versions[0].editors = [...history.versions[0].editors.filter((id: string) => id != userId), userId]
                history.versions[0].time = Date.now();

                await this.historyModel.updateOne({ docId: docId }, { versions: history.versions });
            }
        }

        return { message: 'Updated history of document successfully' };
    }

    async restoreDocVersion(docId: string, version: number) {
        const history = await this.findByDocId(docId);

        const lastVersion = history.versions.filter((_, index) => index != version);
        const newVersion = {
            content: history.versions[version].content,
            editors: history.versions[version].editors,
            time: Date.now()
        };
        const versions = [newVersion, ...lastVersion];
        
        await this.historyModel.updateOne({ docId: docId }, { versions: versions });

        return { message: 'Restore version successfully' };
    }
}
