import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { Document } from './document.schema';

@Schema({ timestamps: true })
export class Notification {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    from: User;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    to: User;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Document' })
    docId: Document;

    @Prop()
    type: string;

    @Prop({ default: false })
    isReaded: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);