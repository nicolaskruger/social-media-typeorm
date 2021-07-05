import { RoutesBackendEnum } from "../../enum";
import { LoginDto, User } from "../../types";
import { useSocialApi } from "./social.api"

export const useAuthApi = () => {
    const instance = useSocialApi();

    const { login: loginRoute } = RoutesBackendEnum;

    const login = async (credentials: LoginDto): Promise<User> => {
        const response = await instance.post(loginRoute, credentials);
        return response.data;
    }

    return {
        login
    }

}