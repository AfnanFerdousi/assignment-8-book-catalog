import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import userService from "./user.service";
import { User } from '@prisma/client';
import  httpStatus  from 'http-status';

const getUsers = catchAsync(async (req: Request, res: Response) => {
 const userPayload = req.user;

    // const users = userService.getUsersService(user);
    const users = await userService.getUsersService(userPayload);
    console.log(users)
    sendResponse<User[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: users,
        message: "Successfully found all users",
    });
})


const getSingleUser =  catchAsync(async (req: Request, res: Response) => {
    const userPayload = req.user
    const userId = req.params.id;
    console.log(userId)
    const user = await userService.getSingleUserService(userPayload, userId);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: user,
        message: "Successfully found user",
    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
     const userPayload = req.user;
    const userId = req.params.id;
    const user = await userService.updateUserService(userId,userPayload, req.body);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: user,
        message: "Successfully updated user",
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const userPayload = req.user;
    const userId = req.params.id;
    const user = await userService.deleteUserService(userId, userPayload);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: user,
        message: "Successfully deleted user",
    })
})

export default {
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser,
};