import { useContext } from "react"
import { defMessage, MessageState } from "../../../types";
import { MessageContext } from "../../context/message.context";

export const useMessage = () => {
    const [, setMessage] = useContext(MessageContext);

    const { error, success } = MessageState;

    const hide = () => {
        setTimeout(() => {
            setMessage(defMessage)
        }, 3000);
    }

    const successMessage = (message: string) => {
        setMessage({
            state: success,
            message
        })
        hide();
    }

    const erroMessage = (message: string) => {
        setMessage({
            state: error,
            message
        })
        hide();
    }

    return {
        successMessage,
        erroMessage
    }

}