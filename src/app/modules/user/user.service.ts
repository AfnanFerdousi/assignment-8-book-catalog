import { JwtPayload } from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus  from 'http-status';

const prisma = new PrismaClient();

const getUsersService = async (userPayload: JwtPayload | null): Promise<User[]> => {
    if(userPayload?.role !== "admin"){
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }
    const users = await prisma.user.findMany({})
    console.log(users)

    return users
}


const getSingleUserService = async (userPayload: JwtPayload | null, userId: string): Promise<User> => {
     if (userPayload?.role !== "admin") {
         throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }
    
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
}

const updateUserService = async (userId: string, userPayload: JwtPayload | null, user: User): Promise<User> => {
    if (userPayload?.role !== "admin") {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: user
    })

    return updatedUser
}

const deleteUserService = async (userId: string, userPayload: JwtPayload | null): Promise<User> => {
    if (userPayload?.role !== "admin") {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }
    const user = await prisma.user.delete({
        where: {
            id: userId
        }
    })

    return user;
};

export default {
    getUsersService,
    getSingleUserService,
    updateUserService,
    deleteUserService
}