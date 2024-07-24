
import { IdoctorController } from "./interfaces/IdoctorController";
import { Request,Response,NextFunction } from "express";
import doctorService from "../services/doctor/doctorService";
import VerificationService from "../services/patient/verificationService";
import bcrypt from 'bcrypt'
import generateJwt from "../middleware/jwt";
import { Payload } from "../middleware/jwt";

export default class doctorController implements IdoctorController{
    private _doctorService:doctorService
    private _verificationService:VerificationService
    constructor(){
        this._doctorService=new doctorService()
        this._verificationService=new VerificationService()
    }
    async signupDoctor(req: Request, res: Response, next: NextFunction) {
        try{
            const {name,email,address,phone,gender,state,pincode,country,password,photo,is_Verified,expertise,dateOfBirth,languageKnown,currentWorkingHospital,workingDays}=req.body
            if(photo){
            const data={name,email,photo,is_Verified}
            const userData=await this._doctorService.signupDoctor(data)
            let tokens=await generateJwt(data as Payload)
            if(userData===null){
                const existingUser=await this._verificationService.doctorlogin(email)
                if(!existingUser?.is_Blocked){
                    return res.status(201).json({message:'GoolgeAuth',name:existingUser?.name,email:existingUser?.email,address:existingUser?.address,phone:existingUser?.phone,gender:existingUser?.gender,state:existingUser?.state,pincode:existingUser?.pincode,country:existingUser?.country,photo:existingUser?.photo,is_Verified:existingUser?.is_Verified,expertise:existingUser?.expertise,dateOfBirth:existingUser?.dateOfBirth,languageKnown:existingUser?.languageKnown,currentWorkingHospital:existingUser?.currentWorkingHospital,workingDays:existingUser?.workingDays,experienceYears:existingUser?.experienceYears,medicalLicenseNo:existingUser?.medicalLicenseNo,workingHospitalContact:existingUser?.workingHospitalContact,documents:existingUser?.documents,_id:existingUser?._id,is_Blocked:existingUser?.is_Blocked,tokens})
                }else{
                    return res.status(403).json({message:'User is blocked'})
                }
            }else{
                if(!userData.is_Blocked){
                    return res.status(201).json({message:'GoolgeAuth',name:userData?.name,email:userData?.email,address:userData?.address,phone:userData?.phone,gender:userData?.gender,state:userData?.state,pincode:userData?.pincode,country:userData?.country,photo:userData?.photo,is_Verified:userData?.is_Verified,expertise:userData?.expertise,dateOfBirth:userData?.dateOfBirth,languageKnown:userData?.languageKnown,currentWorkingHospital:userData?.currentWorkingHospital,workingDays:userData?.workingDays,experienceYears:userData?.experienceYears,medicalLicenseNo:userData?.medicalLicenseNo,workingHospitalContact:userData?.workingHospitalContact,documents:userData?.documents,_id:userData?._id,is_Blocked:userData?.is_Blocked,tokens})
                }else{
                    res.status(403).json({message:'User is blocked'})
                }
            }      
            }else{
                const hashedPassword=await bcrypt.hash(password,10)
                const data={name,email,address,phone,gender,state,pincode,country,password:hashedPassword,photo,expertise,dateOfBirth,languageKnown,currentWorkingHospital,workingDays}
                const userData=await this._doctorService.signupDoctor(data)
                if(userData===null){
                    return res.status(400).json({message:'User Exists'})
                }
                const otp = this._verificationService.generateOtp();
                await this._verificationService.SendOtpEmail(email, 'Your OTP Code', otp);
                return res.status(201).json({
                    message: "Doctor registered successfully and OTP sent",
                    email,
                    otp
                });
            }
           
        }catch(error){
            next(error)
        }      
    }
    async editDoctor(req: Request, res: Response, next: NextFunction){
        try{ 
            const {name,email,photo,currentWorkingHospital,dateOfBirth,experienceYears,gender,medicalLicenseNo,phone,workingHospitalContact,expertise}=req.body
            const data= await this._doctorService.editDoctor({name,email,photo,currentWorkingHospital,dateOfBirth,experienceYears,gender,medicalLicenseNo,phone,workingHospitalContact,expertise})
            return res.status(200).json({message:'Profile Updated',name:data?.name,email:data?.email,photo:data?.photo,currentWorkingHospital:data?.currentWorkingHospital,dateOfBirth:data?.dateOfBirth,experienceYears:data?.experienceYears,gender:data?.gender,medicalLicenseNo:data?.medicalLicenseNo,phone:data?.phone,workingHospitalContact:data?.workingHospitalContact,expertise:data?.expertise,documents:data?.documents,_id:data?._id})
        }catch(err){
            throw err
        }
    }
    async uploadDocuments(req: Request, res: Response, next: NextFunction) {
        try{
            
            const {email,photo}=req.body
            const data=await this._doctorService.uploadDocuments({email,photo})
            if(data){
                return res.status(200).json({message:'File uploaded',documents:data?.documents})
            }else{
                return res.status(400).json({message:'Document failed to upload'})
            }
        }catch(err){

        }
    }
    async deleteDocument(req: Request, res: Response, next: NextFunction) {
        try{
            const {email,index}=req.params
            const data=await this._doctorService.deleteDocument(email,Number(index))
            if(data){
                return res.status(200).json({message:'Document Deleted',documents:data.documents})
            }else{
                return res.status(400).json({message:'Deletion Of document falied'})
            }
        }catch(err){
            throw err
        }
    }
    async slotUpdate(req: Request, res: Response, next: NextFunction){
        try{
            const {id,date,slots}=req.body
            const data=await this._doctorService.slotUpdate(id,date,slots)
            if(data){
                return res.status(200).json({message:'Slots updated'})
            }else{
                return res.status(400).json({message:'Slots booking failed'})
            }
        }catch(err){
            throw err
        }
    }
    async fetchSlots(req: Request, res: Response, next: NextFunction) {
        try{
            const {id,date}=req.query
            const data=await this._doctorService.fetchSlots(id as string,date as string)
            if(data){
                return res.status(200).json({message:'Slots are fetched',Slots:data})
            }
        }catch(err){
            throw err
        }
    }
    async appointments(req: Request, res: Response, next: NextFunction) {
        try{
            const {date,doctorId}=req.query
            const data=await this._doctorService.appointments(doctorId as string,date as string)
            return res.status(200).json({messgage:'Appointments',appointments:data})
        }catch(err){
            throw err
        }
    }
    
}