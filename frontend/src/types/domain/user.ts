export type User = {
    id: number,
    email: string;
    name: string;
    urlImage: string;
    createAt: string;
}

export const invalidUserId: number = -1;

export const defUser: User = {
    id: invalidUserId,
    email: '',
    name: '',
    urlImage: '',
    createAt: '',
}
