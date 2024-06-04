import { Body, Controller, Get, Param, ParseIntPipe, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/utils/guards';

@Controller('user')
export class UserController {
    constructor(private readonly userSevice: UserService) {}

    @Get('/')
    async findAll() {
        return this.userSevice.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.userSevice.findById(id);
    }

    @Put(':id')    
    async update(@Param('id') id: string, @Body(ValidationPipe) updateData: UpdateUserDto) {
        return this.userSevice.update(id, updateData);
    }
}
