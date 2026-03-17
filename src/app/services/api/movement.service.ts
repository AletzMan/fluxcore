import { apiFluxCoreServerGet } from "./axios-instance";
import { PagedResponse } from "@/typesAPI/common.types";
import { Movement } from "@/typesModels/Movement";
import { MovementParams } from "@/typesAPI/movement.types";

class MovementService {
    async getMovements(params?: MovementParams): Promise<PagedResponse<Movement>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if(params?.sortBy) queryParams.append("SortBy", params.sortBy);
        if(params?.sortDirection) queryParams.append("SortDirection", params.sortDirection);
        
        if (params?.type !== undefined) queryParams.append("Type", params.type.toString());
        if (params?.userId !== undefined) queryParams.append("UserId", params.userId.toString());
        if (params?.fromDate) queryParams.append("FromDate", typeof params.fromDate === 'string' ? params.fromDate : params.fromDate.toISOString());
        if (params?.toDate) queryParams.append("ToDate", typeof params.toDate === 'string' ? params.toDate : params.toDate.toISOString());

        const response = await apiFluxCoreServerGet<PagedResponse<Movement>>(`/movements?${queryParams.toString()}`);
        return response as PagedResponse<Movement>;
    }

    async getMovementById(id: number): Promise<Movement> {
        const response = await apiFluxCoreServerGet<Movement>(`/movements/${id}`);
        return response as Movement;
    }
}

export const movementService = new MovementService();
