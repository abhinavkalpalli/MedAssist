import { emitWarning } from "process";
import Doctors, { Doctor } from "../models/doctorModel";
import { IdoctorRepository } from "./interfaces/IdoctorRepository";

export default class doctorRepository implements IdoctorRepository {
    async signupDoctor(userData: Partial<Doctor>): Promise<Doctor | null> {
        try {
            let user=await Doctors.findOne({email:userData.email})
            if(user){
                return null
            }
            return await Doctors.create(userData);
        }catch(err){
            throw err
        }
    }
    async doctorFetch(): Promise<Doctor[] | null> {
        try{
            return await Doctors.find().select('-password')
        }catch(err){
            throw err
        }
    }
    async fetchDoctor(id: string): Promise<Doctor | null> {
        try{
            return await Doctors.findOne({_id:id}).select('-password')
        }catch(err){
            throw err
        }
    }
    async singleDoctor(userData: Partial<Doctor>): Promise<Doctor | null> {
        try{
            return await Doctors.findOne({email:userData.email}).select('-password')
        }catch(err){
            throw err
        }
    }
}
