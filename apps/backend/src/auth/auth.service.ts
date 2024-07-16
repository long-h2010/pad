import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserService } from 'src/user/user.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private mailerService: MailerService,
        private userService: UserService,
    ) {}

    async register(registerDto: RegisterDto): Promise<{ token: string }> {
        const { name, username, email, password } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkUser = await this.userService.findByName(username);
        if (checkUser) throw new UnauthorizedException('Username already exists!');

        const data = {
            name: name,
            username: username,
            email: email,
            password: hashedPassword
        };

        const user = await this.userService.create(data);

        const token = await this.jwtService.signAsync({ id: user._id });
        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { username, password } = loginDto;

        const user = await this.userService.findByName(username);
        if (!user) throw new UnauthorizedException('Invalid Username or password!');

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new UnauthorizedException('Invalid Username or password!');

        const token = await this.jwtService.signAsync({ id: user._id });
        return { token };
    }

    async googleLogin(payload: any): Promise<{ token: string }> {
        const username = payload.email;
        const user = await this.userService.findByName(username);

        if (user) {
            const token = await this.jwtService.signAsync({ id: user._id });
            return { token };
        } else {
            const data = {
                name: payload.name,
                username: username,
                avatar: payload.picture,
            }

            const newUser = await this.userService.create(data);

            const token = await this.jwtService.signAsync({ id: newUser._id });
            return { token };
        }
    }

    generateOTP() { 
        const digits = '0123456789'; 

        let otp = ''; 
        for (let i = 0; i < 6; i++) 
            otp += digits[Math.floor(Math.random() * digits.length)]; 
         
        return otp; 
    } 

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        const user = await this.userService.findByName(forgotPasswordDto.username);

        const otp = this.generateOTP();
        const otpExpiry = new Date(Date.now() + 60 * 1000);

        await this.userService.update(user._id.toString(), { otp: otp, otpExpiry: otpExpiry });

        this.mailerService
            .sendMail({
                to: user.email,
                subject: 'OTP Code ✔',
                text: otp,
            })
            .then(success => console.log(success))
            .catch(err => { throw new Error(`Error in send email: ${err}`) })
    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto) {
        return await this.userService.verifyOtp(verifyOtpDto.username, verifyOtpDto.otp);
    }   

    async resetPassword(resetPassword: ResetPasswordDto) {
        return await this.userService.resetPassword(resetPassword.username, resetPassword.password);
    }
}
