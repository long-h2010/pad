import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {}

    async create(name: string, email: string, password: string) {
        const user = await this.userModel.create({
            name,
            email,
            password,
        });
        
        return user;
    }

    async findAll() {
        return await this.userModel.find();
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id);
        if(!user || user === null) throw new NotFoundException('User Not Found');
        return user;
    }

    async update(id: string, updateData: UpdateUserDto) {
        const newData = updateData;

        const password = updateData.password
        if(password) {
            if(password.length < 6) throw new BadRequestException('Password must have at least 6 characters');
            const hashedPassword = await bcrypt.hash(password, 10);
            newData.password = hashedPassword;
        }

        const user = await this.userModel.findByIdAndUpdate(id, newData); 
        return user;
    }
}
