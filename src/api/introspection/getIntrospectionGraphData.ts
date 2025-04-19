import {API_CONFIG} from "@/config/api.config";
import ApiLayer from "@/api/apiLayer";



export  const getIntrospectionGraphData = async () => {
    const response = ApiLayer.request(
        API_CONFIG.ENDPOINTS.GRAPH_DATA,
        "GET",
        null,
        true
    )
    console.log(response)
    return response;
}