import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "../auth/decorators";
import { JwtGuard } from "../auth/guard";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    @Get('details')
    getUserDetails(@GetUser() user: User, @GetUser('email') email: string) {
        console.log("get user email: ", email)
        return user;
    }
}