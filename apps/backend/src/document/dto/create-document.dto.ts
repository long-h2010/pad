import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateDocumentDto {
    @IsNotEmpty()
    name: string;

    content: string;

    tag?: string[];
}