import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google-guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './utils/guard';

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
    async googleLogin(@Body() token: string): Promise<any> {
        console.log(token)
        return await this.authService.googleLogin(token);
    }

    @Post('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async handleRedirect(@Request() req: any): Promise<any> {
        console.log(req)
        // return await this.authService.googleLogin(token);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Request() req) {
        return req.user;
    }
}
