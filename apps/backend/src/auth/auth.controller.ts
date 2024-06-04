import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google-guards';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './utils/guards';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<{ token: string }> {
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    @Post('google/login')
    async googleLogin(@Body() token): Promise<any> {
        console.log(token)
        return;
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async handleRedirect() {
        return { msg: 'done!' }
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Request() req) {
        return req.user;
    }
}
