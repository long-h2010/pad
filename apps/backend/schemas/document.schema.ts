import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Document {
    @Prop({ default: 'New document' })
    name: string;

    @Prop()
    content: string;

    @Prop([String])
    tag: string[];

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    owners: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    writers: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    readers: User[];
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
