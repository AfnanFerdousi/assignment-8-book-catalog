import { PrismaClient, User } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ILoginUser, ILoginUserResponse } from "./auth.interfaces";
import { createToken } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

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

const loginService = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { email, password } = payload;

    const isUserExist = await prisma.user.findFirst({
        where: {
            email,
        },
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
    }

    if (isUserExist.password !== password) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }

    const { role } = isUserExist;
    const accessToken = createToken({ userId: isUserExist.id, role }, config.jwt.jwt_secret as Secret, config.jwt.expires_in as string);

    const refreshToken = createToken({ userId: isUserExist.id, role }, config.jwt.jwt_refresh_secret as Secret, config.jwt.refresh_expires_in as string);

    return {
        accessToken,
        refreshToken,
    };
};
export default {
    createUserService,
    loginService,
};
