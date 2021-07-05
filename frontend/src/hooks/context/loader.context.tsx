import { createContext, Dispatch, SetStateAction } from "react";


type LoaderType = [boolean, Dispatch<SetStateAction<boolean>>]

const loaderHook: LoaderType = [false, () => undefined]

export const LoaderContext = createContext(loaderHook);