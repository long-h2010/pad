export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    otp?: string;
    otpExpiry?: Date;
}