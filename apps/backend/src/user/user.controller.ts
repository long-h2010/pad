import { Body, Controller, Get, Param, ParseIntPipe, Put, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userSevice: UserService) {}

    @Get('/')
    findAll() {
        return this.userSevice.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userSevice.findOne(id);
    }

    @Put(':id')    
    update(@Param('id') id: string, @Body(ValidationPipe) updateData: UpdateUserDto) {
        return this.userSevice.update(id, updateData);
    }
}
