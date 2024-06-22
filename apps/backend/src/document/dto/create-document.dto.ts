import { IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
    @IsNotEmpty()
    name: string;

    content: string
}