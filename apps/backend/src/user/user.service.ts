import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {}

    async create(createUserDto: CreateUserDto) {
        const user = await this.userModel.create(createUserDto);
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
        return user;
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
        try {
            const user = await this.findById(id);

            if (user.password !== passwordData.password) throw new UnauthorizedException('Old password is incorrect!');

            return await this.update(id, { password: passwordData.newPassword });
        } catch (err: any) {
            throw new Error(`Error at change password in user service: ${err}`);
        }
    }
}
