import Api from "src/core/api";

const getAllOrders = async () => {
    const response = await Api.get("/order/getall");
    return response;
};

export const ordersService = {
    getAllOrders
};