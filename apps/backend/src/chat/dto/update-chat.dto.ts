export class UpdateChatDto {
    userId: string;
    message: string;
    time = Date.now();
}