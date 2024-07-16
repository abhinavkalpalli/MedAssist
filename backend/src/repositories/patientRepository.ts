import Patients, { Patient } from "../models/patientModel";
import { IpatientRepository } from "./interfaces/IpatientRepository";

export default class PatientRepository implements IpatientRepository {
    async signupPatient(userData: Partial<Patient>): Promise<Patient | null> {
        try {
            if(userData.photo){
                const data=await Patients.findOne({email:userData.email})
                if(data){
                    return data
                }else{
                    return await Patients.create(userData)
                }
            }
            const data=await Patients.findOne({email:userData.email})
            if(data){
                return null
            }
            return await Patients.create(userData);
        }catch(err){
            throw err
        }
    }
    async patientFetch(): Promise<Patient[] | null> {
        try{
            return await Patients.find().select('-password')
        }catch(err){
            throw err
        }
    }
    async fetchPatient(id: string): Promise<Patient | null> {
        try{
            return await Patients.findOne({_id:id}).select('-password')
        }catch(err){
            throw err
        }
    }
    async singlePatient(userData: Partial<Patient>): Promise<Patient | null> {
        try{
            return await Patients.findOne({email:userData.email}).exec()
        }catch(err){
            throw err
        }
    }
}
