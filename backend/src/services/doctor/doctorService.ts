import { Doctor } from "../../models/doctorModel";
import { IdoctorService } from "./interfaces/IdoctorService";
import doctorRepository from "../../repositories/doctorRespository";
import adminRepository from "../../repositories/adminRepository";
import { ISlot } from "../../models/slotModel";
import { IBooking } from "../../models/bookingModel";

export default class doctorService implements IdoctorService{
    private _doctorRepository:doctorRepository
    constructor(){
        this._doctorRepository=new doctorRepository()

    }
     async signupDoctor(userData: Partial<Doctor>): Promise<Doctor | null> {
         try{
            return await this._doctorRepository.signupDoctor(userData)
         }catch(error){
            throw error
         }
     }
     async editDoctor(userData: Partial<Doctor>): Promise<Doctor | null> {
         try{
            const data=await this._doctorRepository.singleDoctor(userData)
            if(data){
                data.name = userData.name ?? data.name;
                data.email = userData.email ?? data.email;
                data.photo = userData.photo ?? data.photo;
                data.phone = userData.phone ?? data.phone;
                data.workingHospitalContact = userData.workingHospitalContact ?? data.workingHospitalContact;
                data.experienceYears = userData.experienceYears ? Number(userData.experienceYears) : data.experienceYears;
                data.dateOfBirth = userData.dateOfBirth ?? data.dateOfBirth;
                data.gender = userData.gender ?? data.gender;
                data.medicalLicenseNo = userData.medicalLicenseNo ?? data.medicalLicenseNo;
                data.currentWorkingHospital = userData.currentWorkingHospital ?? data.currentWorkingHospital;
                data.expertise=userData.expertise ?? data.expertise
                await data.save()
                return data
            }else{
                return null
            }
         }catch(err){
            throw err
         }
     }
     async uploadDocuments(userData: Partial<Doctor>): Promise<Doctor | null> {
         try{
            const data=await this._doctorRepository.singleDoctor(userData)
            if(data){
                if(userData.photo){
                    data.documents= data.documents || []
                    data.documents?.push(userData.photo)
                    data.documents_verified=false
                }
                await data.save()
                return data
            }else{
                return null
            }
         }catch(err){
            throw err
         }
     }
     async deleteDocument(email:string,index:number): Promise<Doctor | null> {
         try{
            const data=await this._doctorRepository.singleDoctor({email})
            if(data){
                data.documents=data.documents || []
                data.documents.splice(index,1)
                await data.save()
                return data
            }else{
                return null
            }
         }catch(err){
            throw err
         }
     }
     async slotUpdate(id: string, date: string, slots: string[]): Promise<ISlot> {
         try{
            return await this._doctorRepository.slotUpdate(id,date,slots)
         }catch(err){
            throw err
         }
     }
     async fetchSlots(id: string, date: string): Promise<ISlot | null> {
         try{
            return await this._doctorRepository.fetchSlots(id,date)
         }catch(err){
            throw err
         }
     }
     async appointments(doctorId: string, date: string): Promise<IBooking[] | null> {
         try {
            return await this._doctorRepository.appointments(doctorId,date)
         } catch (error) {
            throw error
         }
     }
}