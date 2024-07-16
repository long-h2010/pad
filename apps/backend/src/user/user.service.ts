import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {}

    async create(createUserDto: CreateUserDto) {
        let nickname = '';
        do { 
            nickname = faker.word.adjective() + faker.animal.type() + Math.floor(Math.random()*1000);
        } while (
            await this.userModel.findOne({ nickname: nickname})
        );
        
        const data = {
            ...createUserDto,
            nickname
        }

        const user = await this.userModel.create(data);
        return user;
    }

    async findAll() {
        return await this.userModel.find();
    }

    async findById(id: string) {
        const user = await this.userModel.findById(id);
        if (!user || user === null) throw new NotFoundException('User Not Found');
        return user;
    }

    async findByName(name: string) {
        const user = await this.userModel.findOne({ username: name });
        if (!user) throw new NotFoundException('User Not Found');
        return user;
    }

    async getNameById(id: string) {
        const user = await this.userModel.findById(id);
        if(!user) throw new BadRequestException('User is not exists');
        return user.name;
    }

    async getNicknameById(id: string) {
        const user = await this.userModel.findById(id);
        if(!user) throw new BadRequestException('User is not exists');
        return user.nickname;
    }

    async getIdByNickname(nickname: string) {
        const user = await this.userModel.findOne({ nickname: nickname });
        if(!user) throw new BadRequestException('User is not exists');
        return user._id;
    }

    async update(id: string, updateData: UpdateUserDto) {
        const newData = updateData;

        const password = updateData.password;
        if (password) {
            if (password.length < 6) throw new BadRequestException('Password must have at least 6 characters');
            const hashedPassword = await bcrypt.hash(password, 10);
            newData.password = hashedPassword;
        };

        const user = await this.userModel.findByIdAndUpdate(id, newData);
        return user;
    }

    async changePassword(id: string, passwordData: any) {
        const user = await this.findById(id);
        if (user.password !== passwordData.password) throw new UnauthorizedException('Old password is incorrect!');
        return await this.update(id, { password: passwordData.newPassword });
    }

    async verifyOtp(name: string, otp: string) {
        const query = {
            username: name,
            otp: otp,
            otpExpiry: { $gt: Date.now() }
        }

        const user = await this.userModel.findOne(query);
        if (!user) throw new BadRequestException('OTP is invalid or has expired');

        return true;
    }

    async resetPassword(name: string, newPassword: string) {
        const password = await bcrypt.hash(newPassword, 10);
        await this.userModel.findOneAndUpdate({ username: name }, { password: password });
    }
}