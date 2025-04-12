import {API_CONFIG} from "@/config/api.config";
import ApiLayer from "@/api/apiLayer";



export  const getPastAnalysis = async () => {
    const response = ApiLayer.request(
        API_CONFIG.ENDPOINTS.AI_SESSION_ALL,
        "GET",
        null,
        true
    )
    console.log(response)
    return response;
}