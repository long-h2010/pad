import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,

        private jwtService: JwtService,

        private userService: UserService,
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkUser = await this.userModel.findOne({ email })
        if (checkUser) throw new UnauthorizedException('Email already exists!');

        const user = await this.userService.create(name, email, hashedPassword);

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email })
        if (!user) throw new UnauthorizedException('Invalid email or password!');

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new UnauthorizedException('Invalid email or password!');

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }
}
