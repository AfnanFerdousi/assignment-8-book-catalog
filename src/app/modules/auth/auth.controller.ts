import { User } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import authService from "./auth.service";

const createUser = catchAsync(async (req, res) => {
    const userData = req.body;
    const newUser = await authService.createUserService(userData);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully register",
        data: newUser,
    });
});

export default {
    createUser,
}