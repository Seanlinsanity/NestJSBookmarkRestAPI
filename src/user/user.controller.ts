import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "../auth/decorators";
import { JwtGuard } from "../auth/guard";
import { EditUserDto } from "./dto";
import { UserService } from "./user.service";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('details')
    getUserDetails(@GetUser() user: User, @GetUser('email') email: string) {
        console.log("get user email: ", email)
        return user;
    }

    @Patch()
    edit(@GetUser("id") userId: number, @Body() dto: EditUserDto) {
        return this.userService.editUser(userId, dto)
    }
}