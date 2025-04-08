import {API_CONFIG} from "@/config/api.config";
import ApiLayer from "@/api/apiLayer";

export const postHabit = async (habit: any) => {
    const response = await ApiLayer.request(
        API_CONFIG.ENDPOINTS.POST_HABITS,
        "POST",
        habit,
        true
    );
    return response;
}