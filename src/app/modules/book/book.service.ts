
import { Book, PrismaClient } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

const createBookService = async (book: Book, userPayload: JwtPayload | null): Promise<Book> => {
    if (userPayload?.role !== "admin") {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }
    const newBook = await prisma.book.create({
        data: book,
    })
    return newBook;
}

export default {
    createBookService
}