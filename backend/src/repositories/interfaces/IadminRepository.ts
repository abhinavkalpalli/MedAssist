import { Admin } from "../../models/adminModel"
export interface IadminRepository{
    signupAdmin(userData:Partial<Admin>):Promise<Admin|null>
}