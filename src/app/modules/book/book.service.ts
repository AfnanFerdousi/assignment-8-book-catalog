import { Book, PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

const createBookService = async (book: Book, userPayload: JwtPayload | null): Promise<Book> => {
    if (userPayload?.role !== "admin") {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }
    const newBook = await prisma.book.create({
        data: book,
    });
    return newBook;
};

const getAllBooksService = async (): Promise<Book[]> => {
    const books = await prisma.book.findMany();
    return books;
};

const getSingleBookService = async (bookId: string): Promise<Book | null> => {
    const book = await prisma.book.findUnique({
        where: {
            id: bookId,
        },
    });
    return book;
};

const updateBookService = async (bookId: string, userPayload: JwtPayload | null, book: Book): Promise<Book> => {
    if (userPayload?.role !== "admin") {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }
    const updatedBook = await prisma.book.update({
        where: {
            id: bookId,
        },
        data: book,
    });
    return updatedBook;
}

const deleteBookService = async (bookId: string, userPayload: JwtPayload | null): Promise<Book> => {
    if (userPayload?.role !== "admin") {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }
    const deletedBook = await prisma.book.delete({
        where: {
            id: bookId,
        },
    });
    return deletedBook;
}
export default {
    createBookService,
    getAllBooksService,
    getSingleBookService,
    updateBookService,
    deleteBookService
};


