export type User = {
    id:string;
    username: string;
    role: 'ADMIN' | 'USER';
    email: string;
    profileImage: string | null;
}