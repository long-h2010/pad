import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSchema } from 'schemas/document.schema';
import { UserSchema } from 'schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.DB_URI),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }])
    ],
    exports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }])
    ],
})

export class DatabaseModule {}
