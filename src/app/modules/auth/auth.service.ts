import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const createUserService = async (userData: User): Promise<User> => {
    const newUser = await prisma.user.create({
        data: userData,
        include: {
            Order: true,
        }
    });

    return newUser;
};


export default {
    createUserService
}