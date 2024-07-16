import { Patient } from "../../../models/patientModel";

export interface IpatientService{
    signupPatient(userData:Partial<Patient>):Promise<Patient | null>
    editPatient(userData:Partial<Patient>):Promise<Patient | null>
}