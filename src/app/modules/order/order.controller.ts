import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status';
import { Order } from "@prisma/client";
import orderService from "./order.service";
import ApiError from "../../../errors/ApiError";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const userPayload = req.user;
    const order = await orderService.createOrderService(req.body.orderedBooks, userPayload);
    sendResponse<Order>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: order,
        message: "Successfully created order",
    });
    
})

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const userPayload = req.user
    const orders = await orderService.getAllOrdersService(userPayload);
    sendResponse<Order[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: orders,
        message: "Successfully found all orders",
    });
})

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const userPayload = req.user; 
    const order = await orderService.getSingleOrderService(orderId, userPayload);

    sendResponse<Order>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: order,
        message: "Successfully found order",
    });
});

const getOrdersOfSpecificUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id; // Assuming this is the customer's user ID, not order ID
    const userPayload = req.user;

    if (userPayload?.userId !== userId) {
        // If the authenticated user is not the same as the requested customer, deny access
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }

    const orders = await orderService.getOrdersOfSpecificUserService(userId, userPayload);

    sendResponse<Order[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: orders,
        message: "Successfully found orders",
    });
});

export default {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getOrdersOfSpecificUser,
}