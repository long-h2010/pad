import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'Username cannot contain spaces or special characters' })
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password must have at least 6 characters' })
    readonly password: string;
}