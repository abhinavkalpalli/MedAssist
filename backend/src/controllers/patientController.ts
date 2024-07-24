
import { IpatientController } from "./interfaces/IpatientController";
import { Request,Response,NextFunction } from "express";
import patientService from "../services/patient/patientService";
import VerificationService from "../services/patient/verificationService";
import bcrypt from 'bcrypt'
import generateJwt from "../middleware/jwt";
import { Payload } from "../middleware/jwt";
import { DoctorQuery } from "../models/doctorModel";
import Slots from "../models/slotModel";
import { log } from "console";

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
            let tokens=await generateJwt(data as Payload)
            if(userData===null){
                const existingUser=await this._verificationService.singlePatient(email)
                if(!existingUser?.is_Blocked){
                    return res.status(201).json({message:'GoolgeAuth',email,photo:existingUser?.photo,name:existingUser?.name,is_Blocked:existingUser?.is_Blocked,_id:existingUser?._id,tokens})
                }else{
                    return res.status(403).json({message:'User is blocked'})
                }
            }else{
                if(!userData?.is_Blocked){
                    return res.status(201).json({
                        message: "Google signup registered",
                        email,photo:userData?.photo,name:userData?.name,is_Blocked:userData?.is_Blocked,_id:userData?._id,tokens
                    });
            }else{
                res.status(403).json({message:'User is blocked'})
            }
            }
            }else{
                const hashedPassword=await bcrypt.hash(password,10)
                const data={name,email,address,phone,gender,state,pincode,country,password:hashedPassword,photo}
                const userData=await this._patientService.signupPatient(data)
                if(userData===null){
                    return res.status(400).json({message:'User Exists'})
                }
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
    async doctors(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, limit, experience, gender, search } = req.query;
        
            let query: DoctorQuery = {
              is_Verified: true,
              is_Blocked: false,
              documents_verified: true,
              experienceYears: experience ? parseInt(experience as string) : undefined,
              gender: gender as string,
              name: search ? { $regex: search as string, $options: "i" } : undefined,
            };
        
            const data = await this._patientService.doctors(query,parseInt(page as string),parseInt(limit as string));
            return res.status(200).json({ data });
          } catch (err) {
            next(err);
          }
    }
    async getbookings(req: Request, res: Response, next: NextFunction) {
        try{
            const {doctorId}=req.query 
            const data=await this._patientService.bookings(doctorId as string)
            return res.status(200).json({List:data?.List,Slots:data?.Slot})
        }catch(err){
            throw err
        }
    }
    async postBooking(req: Request, res: Response, next: NextFunction) {
        try{
            const {doctorId,patientId,shift,date}=req.body
            const UserData={doctorId,patientId,shift,date}
            const data=await this._patientService.postbookings(UserData)
            return res.status(200).json({message:'Booked',data})
        }catch(err){
            throw err
        }
    }
    async yourBooking(req: Request, res: Response, next: NextFunction) {
        try{
            const {patientId}=req.params
            const data=await this._patientService.yourBooking(patientId as string)
            return res.status(200).json({message:'Appointments',data})
        }catch(err){

        }
    }
    async cancelAppointment(req: Request, res: Response, next: NextFunction) {
        try{
            const {id}=req.params
            const data=await this._patientService.cancelAppointment(id as string)
            if(data){
                return res.status(200).json({message:'Appointment Cancelled'})
            }else{
                return res.status(500).json({message:'Internal error'})
            }
        }catch(err){
            throw err
        }
    }
}