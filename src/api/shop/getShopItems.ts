import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";
import {ApiResponse} from "../apiLayer";
import {MarketItem} from "@/app/dashboard/shop/_partials/marketItems";

export const getShopItems:() => Promise<ApiResponse<unknown>> = async () => {
    return await apiLayer.get<MarketItem[]>(
        API_CONFIG.ENDPOINTS.GET_SHOP_ITEMS,
        true,
        {}
    );
}