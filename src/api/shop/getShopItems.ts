import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";
import {ApiResponse} from "../apiLayer";

export const getShopItems:() => Promise<ApiResponse<unknown>> = async () => {
    const response =  await apiLayer.get(
        API_CONFIG.ENDPOINTS.GET_SHOP_ITEMS,
        true,
        {}
    );
    console.log(response)
    return response;
}