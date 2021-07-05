import { config } from "../../config/webpack.config"
import { useAxios } from "./axios.api"

export const useSocialApi = () => {
    const axiosInstance = useAxios(config.serverUrl as string, {})

    return axiosInstance;
}