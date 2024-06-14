import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UserService } from 'src/user/user.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private mailerService: MailerService,
        private userService: UserService,
    ) {}

    async register(registerDto: RegisterDto): Promise<{ token: string }> {
        const { name, username, password } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkUser = await this.userService.findByName(username);
        if (checkUser) throw new UnauthorizedException('Username already exists!');

        const data = {
            name: name,
            username: username,
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

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        this.mailerService.sendMail({
            to: forgotPasswordDto.email,
            text: 'Hello',
            html: '<b>Hello</b>'
        })
            .then(success => console.log(success))
            .catch(err => { throw new Error(`Error in send email: ${err}`) })
    }
}
