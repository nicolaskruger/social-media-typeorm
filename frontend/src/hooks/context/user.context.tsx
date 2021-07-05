import { createContext } from "react";
import { defUser, User } from "../../types";


type UserType = [User, (n: User) => void]

const userHook: UserType = [defUser, () => undefined]

export const UserContext = createContext(userHook);