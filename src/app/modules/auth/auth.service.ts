import { PrismaClient, User } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const prisma = new PrismaClient();

const createUserService = async (userData: User): Promise<User> => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    });
    if (existingUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
    }
    const newUser = await prisma.user.create({
        data: userData,
        include: {
            Order: true,
        },
    });

    return newUser;
};

export default {
    createUserService,
};
