import { Request, Response, NextFunction } from "express";
import { IadminController } from "./interfaces/IadminController";
import adminService from "../services/admin/adminService";
import bcrypt from 'bcrypt'
import VerificationService from "../services/patient/verificationService";

export default class adminController implements IadminController{
    private _adminService:adminService
    private _verificationService:VerificationService

    constructor(){
        this._adminService=new adminService()
        this._verificationService=new VerificationService()

    }
    async signupAdmin(req: Request, res: Response, next: NextFunction){
        try{
        const {email,password}=req.body
            const hashedPassword=await bcrypt.hash(password,10)
            const data={email,password:hashedPassword}
            const adminData= await this._adminService.signupAdmin(data)
            if(adminData==null){
                return res.status(400).json({message:'User exists'})
            }else{
                const otp = this._verificationService.generateOtp();
                await this._verificationService.SendOtpEmail(email, 'Your OTP Code', otp);
                return res.status(201).json({
                    message: "Admin registered successfully and OTP sent",
                    email,otp
                });
            }

        }catch(err){
            throw err
        }

    }
    async patients(req: Request, res: Response, next: NextFunction){
        try{
            const data=await this._adminService.patient()
            return res.status(200).json({data})
        }catch(err){
            throw err
        }
    }
    async doctors(req: Request, res: Response, next: NextFunction){
        try{
            const data=await this._adminService.doctors()
            return res.status(200).json({data})
        }catch(err){
            throw err
        }
    }
    async blockUnblockDoctor(req: Request, res: Response, next: NextFunction) {
        try{
            const {status}=req.body
            const {userId}=req.params
            const data=await this._adminService.blockUnblockDoctors(userId,status)
            if(data){
                return res.status(200).json({message:'user status changed'})
            }else{
                return res.status(500).json({message:'Internal server error'})
            }
        }catch(err){
            throw err
        }
    }
    async blockUnblockPatient(req: Request, res: Response, next: NextFunction) {
        try{
            const {status}=req.body
            const {userId}=req.params
            const data=await this._adminService.blockUnblockPatients(userId,status)
            if(data){
                return res.status(200).json({message:'user status changed'})
            }else{
                return res.status(500).json({message:'Internal server error'})
            }
        }catch(err){
            throw err
        }
    }
    async documentsVerify(req: Request, res: Response, next: NextFunction) {
        try{
            const {userId}=req.params
            const data=await this._adminService.documentsVerify(userId)
            if(data){
                return res.status(200).json({message:'Document Verified'})
            }else{
                return res.status(400).json({message:'Internal Error'})
            }
        }catch(err){
            throw err
        }
    }
    async bookingList(req: Request, res: Response, next: NextFunction) {
        try{
            const {page,date}=req.query    
            const data=await this._adminService.bookingList(page as string,date as string)
            if(data){
                return res.status(200).json({message:'Bookings',bookings:data.bookings,totalPages:data.totalPages,totalBookings:data.totalBookings})
            }
        }catch(err){
            throw err
        }
    }
}