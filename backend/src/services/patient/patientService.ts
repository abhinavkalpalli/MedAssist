import { Patient } from "../../models/patientModel";
import { IpatientService } from "./interfaces/IpatientService";
import PatientRepository from "../../repositories/patientRepository";
import { log } from "console";

export default class patientService implements IpatientService{
    private _patientRepository:PatientRepository
    constructor(){
        this._patientRepository=new PatientRepository()
    }
     async signupPatient(userData: Partial<Patient>): Promise<Patient | null> {
         try{
            return await this._patientRepository.signupPatient(userData)
         }catch(error){
            throw error
         }
     }
     async editPatient(userData: Partial<Patient>): Promise<Patient | null> {
         try{
            const data=await this._patientRepository.singlePatient(userData)

            
            if(data){
                data.name = userData.name ?? data.name;
                data.email = userData.email ?? data.email;
                data.photo = userData.photo ?? data.photo;
                await data.save()
                return data
            }else{
                return null
            }
           
         }catch(err){
            throw err
         }
     }
}