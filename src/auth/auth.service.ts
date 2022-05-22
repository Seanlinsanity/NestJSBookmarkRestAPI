import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable()
export class AuthService {
    constructor(private primsa: PrismaService) {}

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password)

        const user = await this.primsa.user.create({
            data: {
                email: dto.email,
                password: hash
            },
        });
        
        delete user.password

        return user
    }

    login() {
        return {'message': 'log in here....'}
    }
}