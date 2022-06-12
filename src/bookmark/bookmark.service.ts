import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateBookmarkDto, EditBookmarkDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class BookmarkService {
    constructor(private prismaService: PrismaService){}

    async createBookmark(
        userId: number, 
        dto: CreateBookmarkDto) {
        const bookmark = await this.prismaService.bookmark.create({
            data: {
                userId,
                ...dto,
            }
        })
        return bookmark;
    }

    async getBookmarks(userId: number) {
        return await this.prismaService.bookmark.findMany({
            where: {
                userId
            }
        })
    }


    async getBookmarkById(
        userId: number,
        bookmarkId: number
    ) {
        return await this.prismaService.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId
            }
        })
    }

    async editBookmarkById(
        userId: number, 
        bookmarkId: number,
        dto: EditBookmarkDto) {
        const bookmark = await this.prismaService.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })

        if (!bookmark || bookmark.userId != userId) {
            throw new ForbiddenException("Access to resource denied")
        }

        return await this.prismaService.bookmark.update({
            where: {
                id: bookmarkId
            },
            data: {
                ...dto
            }
        })
    
    }

    async deleteBookmarkById(
        userId: number,
        bookmarkId: number
    ) {
        const bookmark = await this.prismaService.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })

        if (!bookmark || bookmark.userId != userId) {
            throw new ForbiddenException("Access to resource denied")
        }

        await this.prismaService.bookmark.delete({
            where: {
                id: bookmarkId
            }
        })
    }
}