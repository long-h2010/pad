import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from './document.schema';
import mongoose from 'mongoose';

@Schema()
export class Chat {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Document' })
    docId: Document;

    @Prop([raw({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String },
        time: { type: Date, default: Date.now() }
    })])
    messages: Record<string, any>[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

