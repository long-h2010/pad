import { Body, Controller, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/utils/guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userSevice: UserService) {}
    @Get('/')
    @UseGuards(AuthGuard)
    async findOne(@Request() req: any) {
        const user = req.user;
        if (!user) throw new Error('Login data does not exist');

        return this.userSevice.findById(user.id);
    }

    @Put(':id')    
    async update(@Param('id') id: string, @Body(ValidationPipe) updateData: UpdateUserDto) {
        return this.userSevice.update(id, updateData);
    }

    @Get('/get-users/:nickname')
    async findUsers(@Param('nickname') nickname: string) {
        return this.userSevice.findUsersByNickName(nickname);
    }

    @Post('/change-password')
    @UseGuards(AuthGuard)
    async changePassword(@Request() req: any) {
        const user = req.user;
        if (!user) throw new Error('Login data does not exist');

        const passwordData: ChangePasswordDto = req.body.passwordData;

        return this.userSevice.changePassword(user.id, passwordData);
    }
}
