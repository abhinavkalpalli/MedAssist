import { IBooking } from "../../../models/bookingModel";
import { Doctor } from "../../../models/doctorModel";
import { ISlot } from "../../../models/slotModel";

export interface IdoctorService{
    signupDoctor(userData:Partial<Doctor>):Promise<Doctor | null>
    editDoctor(userData:Partial<Doctor>):Promise<Doctor | null>
    uploadDocuments(userData:Partial<Doctor>):Promise<Doctor|null>
    deleteDocument(email:string,index:number):Promise<Doctor|null>
    slotUpdate(id:string,date:string,slots:string[]):Promise<ISlot|null>
    fetchSlots(id:string,date:string):Promise<ISlot|null>
    appointments(doctorId:string,date:string):Promise<IBooking[]|null>
}