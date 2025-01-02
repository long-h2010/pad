import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
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
        return this.userSevice.findById(user.id);
    }

    @Get('/get-all')
    async findAll() {
        return this.userSevice.findAll();
    }

    @Get('/total-users')
    async totalUser() {
        return this.userSevice.totalUser();
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

    @Get('/get-users/:name')
    async findUsers(@Param('name') name: string) {
        return this.userSevice.findUsers(name);
    }

    @Get('/user/:page')
    async getUser(@Param('page') page: number) {
        
    }
}
