import { useLoader } from "../loader/loader.hook";
import { useMessage } from "../message/message.hook"

export const useApiHandler = () => {

    const message = useMessage();
    const loader = useLoader();

    const handler = async <T>(promise: () => Promise<T>, msg: string) => {
        try {
            loader.showLoader();
            const data = await promise();
            message.successMessage(msg);
            return data;
        } catch (error) {
            message.erroMessage(error.response.data.message)
        } finally {
            loader.hideLoader();
        }
    }

    return handler;

}