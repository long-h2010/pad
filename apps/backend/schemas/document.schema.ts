import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Document {
    @Prop({ default: 'New document' })
    name: string;

    @Prop()
    content: string;

    @Prop()
    thumbnail: string;

    @Prop({type: [String], default: []})
    tags: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'  })
    owner: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    writers: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    readers: User[];

    @Prop({ default: false })
    isDeleted: boolean;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
