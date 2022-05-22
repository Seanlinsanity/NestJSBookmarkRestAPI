import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable()
export class AuthService {
    constructor(private primsa: PrismaService) {}

    async signup(dto: AuthDto): Promise<AuthDto> {
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

    async login(dto: AuthDto): Promise<AuthDto> {
        const user = await this.primsa.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        if (!user) {
            throw new ForbiddenException('Incorrect Credentials...')
        }

        const isPasswordMatch = await argon.verify(user.password, dto.password)

        if (!isPasswordMatch) {
            throw new ForbiddenException('Incorrect Credentials...')
        }

        delete user.password
        return user
    }
}