import { Body, Controller, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/utils/guard';

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

    @Post('/change-password')
    @UseGuards(AuthGuard)
    async changePassword(@Request() req: any, @Body() passwordData: any) {
        const user = req.user;
        if (!user) throw new Error('Login data does not exist');

        return this.userSevice.changePassword(user.id, passwordData);
    }
}
