import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @Post()
    createBookmark(@GetUser("id") userId: number, @Body() dto: CreateBookmarkDto) {

    }

    @Get()
    getBookmarks(@GetUser("id") userId: number) {

    }

    @Get(":id")
    getBookmarkById(
        @GetUser("id") userId: number,
        @Param("id") bookmarkId: number
    ) {
    
    }

    @Patch()
    editBookmarkById(@GetUser("id") userId: number, @Body() dto: EditBookmarkDto) {
        
    }

    @Delete(":id")
    deleteBookmarkById(
        @GetUser("id") userId: number,
        @Param("id") bookmarkId: number
    ) {
        
    }
}
