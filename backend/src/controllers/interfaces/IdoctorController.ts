import { NextFunction,Request,Response } from "express";

export interface IdoctorController{
    signupDoctor(req:Request,res:Response,next:NextFunction):void
    editDoctor(req:Request,res:Response,next:NextFunction):void
    uploadDocuments(req:Request,res:Response,next:NextFunction):void
    deleteDocument(req:Request,res:Response,next:NextFunction):void
    slotUpdate(req:Request,res:Response,next:NextFunction):void
    fetchSlots(req:Request,res:Response,next:NextFunction):void
    appointments(req:Request,res:Response,next:NextFunction):void
}