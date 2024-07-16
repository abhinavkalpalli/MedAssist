import { Doctor } from "../../models/doctorModel";
import { IdoctorService } from "./interfaces/IdoctorService";
import doctorRepository from "../../repositories/doctorRespository";

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
                data.name=userData.name ?? data.name
                data.email=userData.email ?? data.email
                data.photo=userData.photo ?? data.photo
                data.phone=userData.phone ?? data.phone
                data.workingHospitalContact=userData.workingHospitalContact ?? data.workingHospitalContact
                data.experienceYears=userData.experienceYears??data.experienceYears
                data.dateOfBirth=userData.dateOfBirth ?? data.dateOfBirth
                data.gender=userData.gender ?? data.gender
                data.medicalLicenseNo=userData.medicalLicenseNo ?? data.medicalLicenseNo
                data.currentWorkingHospital=userData.currentWorkingHospital ?? data.currentWorkingHospital
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