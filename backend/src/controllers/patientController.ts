
import { IpatientController } from "./interfaces/IpatientController";
import { Request,Response,NextFunction } from "express";
import patientService from "../services/patient/patientService";
import VerificationService from "../services/patient/verificationService";
import bcrypt from 'bcrypt'

export default class patientController implements IpatientController{
    private _patientService:patientService
    private _verificationService:VerificationService
    constructor(){
        this._patientService=new patientService()
        this._verificationService=new VerificationService()
    }
    async signupPatient(req: Request, res: Response, next: NextFunction) {
        try{
            const {name,email,address,phone,gender,state,pincode,country,password,photo,is_Verified}=req.body
            if(photo){
            const data={name,email,photo,is_Verified}
            const userData=await this._patientService.signupPatient(data)
            if(userData==null){
                return res.status(400).json({message:'User already registered'})
            }
            if(userData?.photo){
                return res.status(200).json({message:'user already registered',email})
            }
            return res.status(201).json({
                message: "Google signup registered",
                email,
            });
            }else{
                const hashedPassword=await bcrypt.hash(password,10)
                const data={name,email,address,phone,gender,state,pincode,country,password:hashedPassword,photo}
                const userData=await this._patientService.signupPatient(data)
                const otp = this._verificationService.generateOtp();
                await this._verificationService.SendOtpEmail(email, 'Your OTP Code', otp);
                return res.status(201).json({
                    message: "Patient registered successfully and OTP sent",
                    email,
                    otp,
                    photo,
                    name
                });
            }
           
        }catch(error){
            next(error)
        }      
    }
    async editPatient(req: Request, res: Response, next: NextFunction) {
        try{
            const {name,email,photo}=req.body
            const userData={name,email,photo}
            const data= await this._patientService.editPatient(userData)
            return res.status(200).json({message:'Profile Updated',name,email,photo})
        }catch(err){
            throw err
        }
    }
}