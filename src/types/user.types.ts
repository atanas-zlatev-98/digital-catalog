export type User = {
    id:string;
    username: string;
    role: Role;
    email: string;
    profileImage: string | null;
}

export type RegularUser = {
    id: string;
    username: string;
    email: string;
    role: Role;
}

type Role = 'ADMIN' | 'USER';