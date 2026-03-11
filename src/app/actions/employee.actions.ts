"use server";
import { employeeService } from "../services/api/employee.service";
import { EmployeeCreate, EmployeeUpdate } from "@/typesAPI/employee.types";
import { apiFluxCoreServerPatch } from "@/app/services/api/axios-instance";
import { Employee } from "@/typesModels/Employee";
import { cacheService } from "@/app/services/cache.service";
import { revalidatePath } from "next/cache";

export const createEmployeeAction = async (data: EmployeeCreate) => {
    try {
        const response = await employeeService.createEmployee(data) as any;
        
        if (response.success === false) {
            return {
                success: false,
                message: response.message || "Ocurrió un error al crear el empleado",
                errorCode: response.errorCode,
                fieldErrors: response.fieldErrors as Record<string, string> | undefined
            };
        }

        return {
            success: response.success,
            message: response.message || "Empleado creado exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al crear el empleado",
            errorCode: error.errorCode,
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}

export async function updateEmployeeSectionAction(id: number, data: Partial<EmployeeUpdate>): Promise<any> {
    try {
        const response = await apiFluxCoreServerPatch(`/employees/${id}`, data);

        // Limpiar el caché en memoria del servidor
        cacheService.invalidateKeysByPattern(`get:/employees/${id}`);
        cacheService.invalidateKeysByPattern(`get:/employees:`);

        // Revalidar las rutas de Next.js
        revalidatePath(`/personas/empleados/${id}`);
        revalidatePath('/personas/empleados');

        return response;
    } catch (error: any) {
        console.error("Error in updateEmployeeSectionAction:", error);
        return {
            success: false,
            message: error.message || "Error al actualizar el empleado",
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}
