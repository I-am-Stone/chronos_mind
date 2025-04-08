import ApiLayer from "@/api/apiLayer";
import { API_CONFIG } from "@/config/api.config";

const postSession = async (session: any) => {
    const response = await ApiLayer.request(
        API_CONFIG.ENDPOINTS.POST_SESSION,
        "POST",
        session,
        true
    );
    return response;
};

export default postSession;