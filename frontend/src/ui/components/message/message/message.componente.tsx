import { useContext } from "react"
import { MessageContext } from "../../../../hooks/context/message.context"
import { messageState } from "../../../../types";
import "./message.css"

export const MessageComp = () => {

    const [message] = useContext(MessageContext);

    const state = messageState[message.state];

    return (
        <div className={`message message-${state}`} >{message.message}</div>
    )
}