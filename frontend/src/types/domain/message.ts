import { EnumDictionary } from "../utils"

export enum MessageState {
    success,
    error,
    hide
}

export type Message = {
    state: MessageState
    message: string;
}

export const defMessage: Message = {
    state: MessageState.hide,
    message: "don't show this"
}

export const messageState: EnumDictionary<MessageState, string> = {
    [MessageState.success]: "success",
    [MessageState.error]: "error",
    [MessageState.hide]: "hide"
}