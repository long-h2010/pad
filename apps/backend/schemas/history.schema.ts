import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from './document.schema';

@Schema()
export class History {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Document' })
    docId: Document;

    @Prop([raw({
        content: { type: String },
        editors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        time: { type: Date, default: Date.now() }
    })])
    versions: Record<string, any>[];
}

export const HistorySchema = SchemaFactory.createForClass(History);
