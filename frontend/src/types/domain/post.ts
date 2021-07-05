import { User } from "./user";

export type Post = {
    id: number,
    text: string,
    pubic: boolean,
    user: User,

}