import ApiLayer from "@/api/apiLayer";
import { API_CONFIG } from "@/config/api.config";

export const habitComplete = async (habit_id: number) => {
    const response = await ApiLayer.request(
        API_CONFIG.ENDPOINTS.UPDATE_COMPLETE.replace('{id}', habit_id.toString()),
        "PUT",
        { completed: true },
        true
    );
    return response;
}