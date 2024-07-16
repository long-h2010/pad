import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Gender from 'enums/gender.enum';
import Role from 'enums/role.enum';

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

    @Prop()
    nickname: string;

    @Prop({ default: '/img' })
    avatar: string;

    @Prop({enum: Gender})
    gender: string;

    @Prop()
    birthday: Date;

    @Prop({enum: Role, default: Role.user})
    role: string;

    @Prop()
    otp: string;

    @Prop()
    otpExpiry: Date;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
