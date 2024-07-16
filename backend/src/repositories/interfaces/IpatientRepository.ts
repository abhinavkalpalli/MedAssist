import { Patient } from "../../models/patientModel";
export interface IpatientRepository{
    signupPatient(userData:Partial<Patient>):Promise<Patient|null>
    patientFetch():Promise<Patient[]|null>
    fetchPatient(id:string):Promise<Patient|null>
    singlePatient(userData:Partial<Patient>):Promise<Patient|null>
}