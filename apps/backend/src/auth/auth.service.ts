import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async register(registerDto: RegisterDto): Promise<{ token: string }> {
        const { name, username, password } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkUser = await this.userService.findByName(username);
        if (checkUser) throw new UnauthorizedException('Username already exists!');

        const user = await this.userService.create(name, username, hashedPassword);

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

    async googleLogin(token: string): Promise<any> {
        // const { username } = loginDto;

        // const user = await this.userService.findByName(username);

        // if (user) {
        //     const token = await this.jwtService.signAsync({ id: user._id });
        //     return { token };
        // } else {
        //     return 
        // }
        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.GOOGLE_SECRET });
        console.log(payload)
    }
}
