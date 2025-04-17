import {API_CONFIG} from "@/config/api.config";
import ApiLayer from "@/api/apiLayer";


export  const getProfileData = async () => {
    const response = ApiLayer.get(
        API_CONFIG.ENDPOINTS.GET_PROFILE,
        true,
        {}

    )
    return response;
}
