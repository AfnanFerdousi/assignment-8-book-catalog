import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import bookService from "./book.service";
import { Book } from "@prisma/client";


const createBook = catchAsync(async (req: Request, res: Response) => {
    const userPayload = req.user;
    const book = await bookService.createBookService(req.body, userPayload);
    sendResponse<Book>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: book,
        message: "Successfully created book",
    });
});


const getAllBooks = catchAsync(async (req: Request, res: Response) => {
    const books = await bookService.getAllBooksService();
    sendResponse<Book[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: books,
        message: "Successfully found all books",
    });
})

export default {
    createBook,
    getAllBooks
}