import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
);  

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<{ token: string }> {
        return await this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ token: string }> {
        return await this.authService.login(loginDto);
    }

    @Post('google/login')
    async handleRedirect(@Body('token') token): Promise<any> {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        return this.authService.googleLogin(payload);
    }

    @Post('/forgot-password')
    async forgotPassword(@Body(ValidationPipe) forgotPasswordDto: ForgotPasswordDto) {
        try {
            return this.authService.forgotPassword(forgotPasswordDto);
        } catch (err: any) {
            throw new Error(`Error at forgot password in auth controller: ${err}`);
        }
    }
}
