import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private primsa: PrismaService, 
        private jwtService: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto: AuthDto): Promise<{access_token: string}> {
        const hash = await argon.hash(dto.password)

        const user = await this.primsa.user.create({
            data: {
                email: dto.email,
                password: hash
            },
        });

        return this.signToken(user.id, user.email)
    }

    async login(dto: AuthDto): Promise<{access_token: string}> {
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

        return this.signToken(user.id, user.email)
    }

    async signToken(
        userId: number, 
        email: string
    ): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email
        }
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        })

        return {
            access_token: token
        }
    }
}