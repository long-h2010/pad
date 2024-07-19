import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import Gender from 'enums/gender.enum';
import Role from 'enums/role.enum';

export class UpdateUserDto {
    name?: string;

    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'Username cannot contain spaces or special characters' })
    username?: string;

    nickname?: string;

    @MinLength(6, { message: 'Password must have at least 6 characters' })
    password?: string;

    avatar?: string;

    @IsEnum(Gender, {  message: 'Valid gender required' }) 
    gender?: string;

    birthday?: Date;

    @IsEnum(Role, {  message: 'Valid role required' }) 
    role?: string;

    otp?: string;

    otpExpiry?: Date;
}