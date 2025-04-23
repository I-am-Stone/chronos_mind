import apiLayer from "@/api/apiLayer";
import {API_CONFIG} from "@/config/api.config";



export const addSubtask = async (goalId:number, title:string)=> {
    const data = {
        title: title,
        goal: goalId,
    }
    return await apiLayer.request(
        API_CONFIG.ENDPOINTS.SUB_TASK,
        "POST",
        data,
        true
    );
}