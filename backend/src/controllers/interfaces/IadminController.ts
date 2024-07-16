import { NextFunction,Request,Response } from "express";

export interface IadminController{
    signupAdmin(req:Request,res:Response,next:NextFunction):void
    patients(req:Request,res:Response,next:NextFunction):void
    doctors(req:Request,res:Response,next:NextFunction):void
    blockUnblockDoctor(req:Request,res:Response,next:NextFunction):void
    blockUnblockPatient(req:Request,res:Response,next:NextFunction):void

}