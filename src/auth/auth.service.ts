import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {
    constructor(private primsa: PrismaService) {}

    async signup(dto: AuthDto) {
        const user = await this.primsa.user.create({
            data: {
                email: dto.email,
                password: dto.password
            },
        });
        
        delete user.password

        return user
    }

    login() {
        return {'message': 'log in here....'}
    }
}