import { Body, Controller, Get, Param, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/utils/guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(private readonly userSevice: UserService) {}
    
    @Get('/')
    @UseGuards(AuthGuard)
    async findOne(@Request() req: any) {
        const user = req.user;
        return this.userSevice.findById(user.id);
    }

    @Post('/update-information')
    @UseGuards(AuthGuard)   
    async updateInfo(@Request() req: any) {
        const user = req.user;
        const updateData: UpdateUserDto = req.body.updateData;

        return this.userSevice.updateInfor(user.id, updateData);
    }

    @Post('/change-password')
    @UseGuards(AuthGuard)
    async changePassword(@Request() req: any) {
        const user = req.user;
        const passwordData: ChangePasswordDto = req.body.passwordData;

        return this.userSevice.changePassword(user.id, passwordData);
    }

    @Get('/get-users/:nickname')
    async findUsers(@Param('nickname') nickname: string) {
        return this.userSevice.findUsersByNickName(nickname);
    }
}
