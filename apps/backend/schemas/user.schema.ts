import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string;

    @Prop({ unique: [true, 'Duplicate username entered'] })
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop({ default: '/img' })
    avatar: string;

    @Prop()
    otp: string;

    @Prop()
    otpExpiry: Date;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
