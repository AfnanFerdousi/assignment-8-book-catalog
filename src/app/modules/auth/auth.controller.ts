import { User } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import authService from "./auth.service";
import config from "../../../config";
import { ILoginUserResponse } from "./auth.interfaces";
import { Request, Response } from "express";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await authService.createUserService(userData);

    if (!newUser) {
        return sendResponse<User>(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "Data not found",
        });
    }

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully register",
        data: newUser,
    });
});


const login = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.loginService(req.body);
    const { refreshToken, ...others } = result;

    const cookieOptions = {
        secure: config.env === "production",
        httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully !",
        data: others,
    });
});

export default {
    createUser,
    login,
}