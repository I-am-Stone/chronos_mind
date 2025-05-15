import ApiLayer from "@/api/apiLayer";
import { API_CONFIG } from "@/config/api.config";

interface SubtaskCompleteResponse {
    success: boolean;
    message?: string;
    error?: string;
    data?: any;
}

export const SubtaskComplete = async (subtask_id: number) => {
    if (!API_CONFIG.ENDPOINTS.COMPLETE_SUB_TASK) {
        throw new Error("COMPLETE_SUB_TASK endpoint is not defined in API_CONFIG");
    }

    const endpoint = API_CONFIG.ENDPOINTS.COMPLETE_SUB_TASK.replace('{id}', subtask_id.toString());

    const response: SubtaskCompleteResponse = await ApiLayer.put(
        endpoint,
        {"completed": true},      // Empty body (or include any required data)
        true
    );

    return response;
};