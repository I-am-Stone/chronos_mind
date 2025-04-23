import apiLayer from "@/api/apiLayer";
import { API_CONFIG } from "@/config/api.config";

export const getOrders = async () => {
    const response = await apiLayer.get(
        API_CONFIG.ENDPOINTS.ALL_ORDERED_ITEMS,
        true,
        {}
    );
    console.log(response.data);
    return response;

}