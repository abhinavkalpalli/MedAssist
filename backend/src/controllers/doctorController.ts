
import { IdoctorController } from "./interfaces/IdoctorController";
import { Request,Response,NextFunction } from "express";
import doctorService from "../services/doctor/doctorService";
import VerificationService from "../services/patient/verificationService";
import bcrypt from 'bcrypt'

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
                if(userData==null){
                    return res.status(400).json({message:'User Exists'})
                }
            return res.status(201).json({
                message: "Google signup registered",
                email
            });
            }else{
                const hashedPassword=await bcrypt.hash(password,10)
                const data={name,email,address,phone,gender,state,pincode,country,password:hashedPassword,photo,expertise,dateOfBirth,languageKnown,currentWorkingHospital,workingDays}
                const userData=await this._doctorService.signupDoctor(data)
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
            const {name,email,photo,currentWorkingHospital,dateOfBirth,experienceYears,gender,medicalLicenseNo,phone,workingHospitalContact}=req.body
            const userData={name,email,photo}
            const data= await this._doctorService.editDoctor(userData)
            return res.status(200).json({message:'Profile Updated',name,email,photo,currentWorkingHospital,dateOfBirth,experienceYears,gender,medicalLicenseNo,phone,workingHospitalContact})
        }catch(err){
            throw err
        }
    }
}