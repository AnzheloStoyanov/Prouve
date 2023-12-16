// products.service.js
import Api from "src/core/api";

const getAllPayments = async () => {
    const response = await Api.get("/payments/getall");
    return response;
};

export const paymentsService = {
    getAllPayments
};