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

export default {
    createCategoryService,
};
