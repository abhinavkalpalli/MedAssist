
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import VerificationService from "../services/patient/verificationService";
import { IverificationController } from "./interfaces/IverificationController";
import bcrypt from 'bcrypt'
import { error } from "console";
import { generate } from "otp-generator";
import generateJwt from "../middleware/jwt";
import { Payload } from "../middleware/jwt";
import patientService from "../services/patient/patientService";
import PatientRepository from "../repositories/patientRepository";


export default class verificationController implements IverificationController{
    private _verficationService:VerificationService;
    private _patientRepository:PatientRepository
    constructor(){
        this._verficationService=new VerificationService()
        this._patientRepository=new PatientRepository()
    }
    async otpverify(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try{
            const {email}=req.body
            const data=await this._verficationService.optverify(email)
            if(data){
            return res.status(200).json({message:'verified'})
            }
        }catch(err){
            throw err
        }
    }
    async otpverifydoctor(req: Request, res: Response, next: NextFunction){
        try{
            const {email}=req.body
            const data=await this._verficationService.optverifydoctor(email)
            if(data){
            return res.status(200).json({message:'verified'})
            }
        }catch(err){
            throw err
        }
    }
    async forgotpassword(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction){
        try{
            const {email}=req.body
            const otp= this._verficationService.generateOtp()
            const data=await this._verficationService.SendOtpEmail(email,'This is for your forgot password',otp)
            return res.status(200).json({message:'otp sent',email,otp})
        }catch(error){
            throw error
        }    
    }
    async resetpassword(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try{
            const {email,password,oldPassword}=req.body            
            if(oldPassword){
                const user=await this._verficationService.patientlogin(email)
                if(user){
                    const isMatch=await bcrypt.compare(oldPassword,user?.password)
                    if(isMatch){
                        const hashedPassword=await bcrypt.hash(password,10)
                        const data=await this._verficationService.resetpassword(email,hashedPassword)
                        return res.status(200).json({message:'Password changed'})
                    }else{
                        return res.status(400).json({message:'Enter correct old password'})
                    }
                }
            }else{
                const hashedPassword=await bcrypt.hash(password,10)
                const data=await this._verficationService.resetpassword(email,hashedPassword)
                console.log('hi patients',data);
                return res.status(200).json({message:'Password changed'})
            } 
        }catch{
            throw error
        }
    }
    async doctorforgotpassword(req: Request, res: Response, next: NextFunction) {
        try{
            const {email}=req.body
            const otp= this._verficationService.generateOtp()
            const data=await this._verficationService.SendOtpEmail(email,'This is for your forgot password',otp)
            return res.status(200).json({message:'otp sent',email,otp,isDoctor:true})
        }catch(error){
            throw error
        }    
    }
    async doctorresetpassword(req: Request, res: Response, next: NextFunction) {
        try{
            const {email,password,oldPassword}=req.body
            if(oldPassword){
                const user=await this._verficationService.doctorlogin(email)
                if(user){
                    const isMatch=await bcrypt.compare(oldPassword,user?.password)
                    if(isMatch){
                        const hashedPassword=await bcrypt.hash(password,10)
                        const data=await this._verficationService.doctorresetpassword(email,hashedPassword)
                        return res.status(200).json({message:'Password changed'})
                    }else{
                        return res.status(400).json({message:'Enter correct old password'})
                    }
                }
            }
            const hashedPassword=await bcrypt.hash(password,10)
            const data=await this._verficationService.doctorresetpassword(email,hashedPassword)
            return res.status(200).json({message:'Password changed doctor'})
        }catch{
            throw error
        }
    }
    async patientlogin(req: Request, res: Response, next: NextFunction) {
        const {email,password}=req.body
        try {
            const data = await this._verficationService.patientlogin(email);
    
            if (data) {
                const password2 = data.password;
                const isMatch = await bcrypt.compare(password, password2);
    
                if (isMatch) {
                    const { name, photo,is_Blocked,_id } = data;
                    if(!is_Blocked){
                        let tokens=await generateJwt(data as Payload)
                        return res.status(200).json({ message: 'Patient Logged in', email, name, photo,tokens });
                   }else{
                    return res.status(403).json({ message: 'User is blocked' });
                   }
                } else {
                    return res.status(401).json({ message: 'Password did not match' });
                }
            } else {
                return res.status(404).json({ message: 'Patient not found' });
            }
        } catch (err) {
            console.error('Error during patient login', err);
            next(err);
        }
     
    }
    async doctorlogin(req: Request, res: Response, next: NextFunction) {
        const {email,password}=req.body
        try {
            const data = await this._verficationService.doctorlogin(email);
    
            if (data) {
                const password2 = data.password;
                const isMatch = await bcrypt.compare(password, password2);
    
                if (isMatch) {
                    const { name, photo,is_Blocked,is_Verified,dateOfBirth,address,currentWorkingHospital,gender,expertise,workingDays,phone } = data;
                    if(!is_Blocked){
                        let tokens=await generateJwt(data as Payload)
                        return res.status(200).json({ message: 'Doctor Logged in', email, name, photo,tokens,dateOfBirth,address,currentWorkingHospital,gender,expertise,workingDays,phone,is_Verified });
                   }else{
                    return res.status(403).json({ message: 'User is blocked' });
                   }
                } else {
                    return res.status(401).json({ message: 'Password did not match' });
                }
            } else {
                return res.status(404).json({ message: 'Doctor not found' });
            }
        } catch (err) {
            console.error('Error during patient login', err);
            next(err);
        }
     
    }
    async adminlogin(req: Request, res: Response, next: NextFunction) {
        const {email,password}=req.body
        try {
            const data = await this._verficationService.adminlogin(email);
    
            if (data) {
                const password2 = data.password;
                const isMatch = await bcrypt.compare(password, password2);
    
                if (isMatch) {
                    const { email} = data;
                        let tokens=await generateJwt(data as Payload)
                        return res.status(200).json({ message: 'Admin Logged in', email,tokens });
                } else {
                    return res.status(401).json({ message: 'Password did not match' });
                }
            } else {
                return res.status(404).json({ message: 'Doctor not found' });
            }
        } catch (err) {
            console.error('Error during patient login', err);
            next(err);
        }
     
    }
}