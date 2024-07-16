
import { NextFunction,Request,Response } from "express";

export interface IverificationController{
    otpverify(req:Request,res:Response,next:NextFunction):void
    forgotpassword(req:Request,res:Response,next:NextFunction):void
    resetpassword(req:Request,res:Response,next:NextFunction):void
    otpverifydoctor(req:Request,res:Response,next:NextFunction):void
    doctorforgotpassword(req:Request,res:Response,next:NextFunction):void
    doctorresetpassword(req:Request,res:Response,next:NextFunction):void    
    patientlogin(req:Request,res:Response,next:NextFunction):void
    doctorlogin(req:Request,res:Response,next:NextFunction):void
    adminlogin(req:Request,res:Response,next:NextFunction):void
}