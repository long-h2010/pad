import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class UsersRoleDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    nicknames: string[]
}