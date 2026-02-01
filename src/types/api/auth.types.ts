import { User } from "../models/User";
import { ApiResponse } from "./common.types";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    name: string;
    role: string;
}


export interface LoginResponse extends ApiResponse<{ user: AuthUser; token: string; expiresAt: Date; }> {

}

export interface RegisterData {
    username: string;
    password: string;
    email: string;
    name: string;
    roleId: number;
}
