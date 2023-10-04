import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import  httpStatus  from 'http-status';
import { Category } from "@prisma/client";
import categoryService from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await categoryService.createCategoryService(req.body);
    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: category,
        message: "Successfully created category",
    });
    
})

export default {
    createCategory
}