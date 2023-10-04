import { JwtPayload } from "jsonwebtoken";
import { PrismaClient, Order } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

const prisma = new PrismaClient();

const createOrderService = async (
    data: {
        bookId: string;
        quantity: number;
    }[],
    userPayload: JwtPayload | null,
) => {
    console.log(userPayload);
    const result = await prisma.order.create({
        data: {
            userId: userPayload?.userId,
            status: "Pending",
            orderedBooks: data.map(book => ({
                quantity: book.quantity,
                book: book.bookId,
            })),
        },
    });

    return result;
};

const getAllOrdersService = async (userPayload: JwtPayload | null): Promise<Order[]> => {
    if (userPayload?.role !== "admin") {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }
    const orders = await prisma.order.findMany({
        where: {
            userId: userPayload?.userId,
        },
    });

    return orders;
};

const getSingleOrderService = async (orderId: string, userPayload: JwtPayload | null): Promise<Order | null> => {
    if (!userPayload) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED");
    }

    const isAdmin = userPayload.role === "admin";

    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });

    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
    }

    if (!(isAdmin || order.userId === userPayload.userId)) {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }

    return order;
};

const getOrdersOfSpecificUserService = async (customerId: string, userPayload: JwtPayload | null): Promise<Order[]> => {
    if (!userPayload) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED");
    }

    if (userPayload.role !== "admin" && userPayload.userId !== customerId) {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
    }

    const orders = await prisma.order.findMany({
        where: {
            id: customerId,
        },
    });

    return orders;
};

export default {
    createOrderService,
    getAllOrdersService,
    getSingleOrderService,
    getOrdersOfSpecificUserService,
};
