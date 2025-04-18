import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";


export const getShopItems = async () => {
    return await apiLayer.get(
        API_CONFIG.ENDPOINTS.GET_SHOP_ITEMS
    );
}