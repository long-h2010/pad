import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly otp: string;
}