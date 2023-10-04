import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCategoryService = async (category: Category): Promise<Category> => {
    const newCategory = await prisma.category.create({
        data: category
    });
    return newCategory;
}

export default {
    createCategoryService
}