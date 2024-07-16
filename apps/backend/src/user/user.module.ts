import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [DatabaseModule, JwtModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
