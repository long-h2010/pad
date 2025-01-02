import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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

    async generateToken(uderId: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ id: uderId }),
            this.jwtService.signAsync({ id: uderId }, { expiresIn: '7d' }),
        ]);

        return { accessToken, refreshToken };
    }

    async register(registerDto: RegisterDto): Promise<{ accessToken: string, refreshToken: string }> {
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

        const token = await this.generateToken(user._id.toString());
        return token;
    }

    async refreshToken(refreshToken: string) {
        const verify = await this.jwtService.verifyAsync(refreshToken, { secret: process.env.JWT_SECRET });
        const user = this.userService.findById(verify.id);
        if (user) return this.generateToken(verify.id);
        else throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
    }

    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;

        const user = await this.userService.findByName(username);
        if (!user) throw new UnauthorizedException('Invalid Username or password!');

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new UnauthorizedException('Invalid Username or password!');

        const token = await this.generateToken(user._id.toString());
        return { accessToken: token.accessToken, refreshToken: token.refreshToken, name: user.nickname, avatar: user.avatar };
    }

    async googleLogin(payload: any) {
        const username = payload.email;
        const user = await this.userService.findByName(username);

        if (user) {
            const token = await this.generateToken(user._id.toString());
            return { accessToken: token.accessToken, refreshToken: token.refreshToken, name: user.nickname, avatar: user.avatar };
        } else {
            const data = {
                name: payload.name,
                username: username,
                avatar: payload.picture,
            }

            const newUser = await this.userService.create(data);

            const token = await this.generateToken(newUser._id.toString());
            return { accessToken: token.accessToken, refreshToken: token.refreshToken, name: user.nickname, avatar: user.avatar };
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

        await this.userService.updateInfor(user._id.toString(), { otp: otp, otpExpiry: otpExpiry });

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
