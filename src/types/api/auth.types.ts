import { User } from "../models/User";


export interface LoginResponse {
    user: User;
    accessToken: string;
    expiresAt: Date;
}

export interface RegisterData {
    username: string;
    password: string;
    email: string;
    name: string;
    roleId: number;
}
