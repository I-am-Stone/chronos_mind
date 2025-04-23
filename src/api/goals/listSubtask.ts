import apiLayer from "@/api/apiLayer";
import { API_CONFIG } from "@/config/api.config";

export const getSubTAsk = async () => {
    const response = await apiLayer.get(
        API_CONFIG.ENDPOINTS.SUB_TASK_LIST,
        true, // Authentication required
        {} // Optional headers (empty object if not needed)
    );
    return response;
}