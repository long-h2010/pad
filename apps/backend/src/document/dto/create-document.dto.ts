import { IsNotEmpty, MinLength } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateDocumentDto {
    @IsNotEmpty()
    name: string;

    content: string;

    tag?: string[];
}