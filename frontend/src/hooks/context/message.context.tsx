import { createContext, Dispatch, SetStateAction } from "react";
import { defMessage, Message } from "../../types";


type MessageType = [Message, Dispatch<SetStateAction<Message>>]

const messageHook: MessageType = [defMessage, () => undefined]

export const MessageContext = createContext(messageHook);