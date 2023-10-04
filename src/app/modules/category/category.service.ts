import { Category, PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const prisma = new PrismaClient();

const createCategoryService = async (category: Category, userPayload: JwtPayload | null): Promise<Category> => {
    if (userPayload?.role !== "admin") {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }
    const newCategory = await prisma.category.create({
        data: category,
    });
    return newCategory;
};

const getAllCategoriesService = async (): Promise<Category[]> => {
    const categories = await prisma.category.findMany();
    return categories;
};

const getSingleCategoryService = async (categoryId: string): Promise<Category | null> => {
    if(!categoryId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "BAD_REQUEST");
    }
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        },
    });
    return category;
}

export default {
    createCategoryService,
    getAllCategoriesService,
    getSingleCategoryService
};
