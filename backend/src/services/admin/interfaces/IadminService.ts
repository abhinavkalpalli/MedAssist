import { Admin } from "../../../models/adminModel"
import { Patient } from "../../../models/patientModel"
import { Doctor } from "../../../models/doctorModel"

export interface IadminService{
    signupAdmin(userData:Partial<Admin>):Promise<Admin | null>
    patient():Promise<Patient[] | null>
    doctors():Promise<Doctor[] | null>
    blockUnblockDoctors(id:string,status:boolean):Promise<Doctor|null>
    blockUnblockPatients(id:string,status:boolean):Promise<Patient|null>
}