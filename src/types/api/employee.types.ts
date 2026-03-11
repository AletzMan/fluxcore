import { UserRole } from "@/enums/common.enums";
import { BaseParams } from "./common.types"; 

export interface EmployeeUpdate {
    userCode?: string;
    name?: string;
    username?: string;
    email?: string;
    roleId?: number;
    isActive?: boolean;
}

export interface EmployeeCreate {
    name: string;
    username: string;
    password: string;
    email: string;
    roleId: number;
}
    
export interface EmployeeParams extends BaseParams {
    search?: string; 
    role?: UserRole;
}
    