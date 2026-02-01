import { User } from "../models/User";
import { ApiResponse } from "./common.types";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse extends ApiResponse<{ user: User; accessToken: string; expiresAt: Date; }> {

}

export interface RegisterData {
    username: string;
    password: string;
    email: string;
    name: string;
    roleId: number;
}
