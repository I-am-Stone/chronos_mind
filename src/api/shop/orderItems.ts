import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";

interface orderData {
    quantity:number;
    inventory:number;
}


export const OrderItem = async (order: orderData) => {
    const response = await apiLayer.post(
        API_CONFIG.ENDPOINTS.ORDER_ITEM,
        order,
        true,
    );
    return response;
};