import { BaseParams } from "./common.types" 

export interface CreateBrand {
  name: string,
  description: string,
  logoFile: File
}    

export interface UpdateBrand {
  name: string,
  description: string,
  logoFile: File
}  

export interface BrandParams extends BaseParams {
  search?: string
}