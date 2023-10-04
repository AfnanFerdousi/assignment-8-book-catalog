import { JwtPayload } from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus  from 'http-status';

const prisma = new PrismaClient();

// const getUsersService = (user: JwtPayload | null): Promise<User[]> => {
//     if (!user) {
//         throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//     }
    
//     const users = prisma.user.findMany({})
//     console.log(users)
//     return users
// };

const getUsersService = async (): Promise<User[]> => {
    const users = await prisma.user.findMany({})
    console.log(users)

    return users
}


const getSingleUserService = async(userId: string): Promise<User> => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found")
    }

    return user;
}

const updateUserService = async (userId: string, user: User): Promise<User> => {
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: user
    })

    return updatedUser
}

const deleteUserService = async (userId: string): Promise<User> => {
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