import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import  httpStatus  from 'http-status';
import { Category } from "@prisma/client";
import categoryService from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const userPayload = req.user;
    const category = await categoryService.createCategoryService(req.body, userPayload);
    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: category,
        message: "Successfully created category",
    });
    
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategoriesService();
    sendResponse<Category[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: categories,
        message: "Successfully found all categories",
    })
})

export default {
    createCategory,
    getAllCategories
}