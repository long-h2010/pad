import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/guards';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ) {}

    @Post('signup')
    signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Post('login')
    login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return { msg: 'done'}
    }
    
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        return { msg: 'done!'}
    }
}
