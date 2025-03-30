import { API_CONFIG } from "@/config/api.config";
import apiLayer from "../apiLayer";

export const UpdateProgress = async (goal_id: number, progress: number) => {
    const response = await apiLayer.request(
        API_CONFIG.ENDPOINTS.UPDATE_PROGRESS.replace('{goal_id}', goal_id.toString()),
        "PUT",
        { progress },
        true
    );
    return response;
};