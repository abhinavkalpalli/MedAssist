import path from "path";
import Booking, { BookingAndSlots, IBooking } from "../models/bookingModel";
import Patients, { Patient } from "../models/patientModel";
import Slots from "../models/slotModel";
import { IpatientRepository } from "./interfaces/IpatientRepository";

export default class PatientRepository implements IpatientRepository {
    async signupPatient(userData: Partial<Patient>): Promise<Patient | null> {
        try {
            if(userData.photo){
                const data=await Patients.findOne({email:userData.email})
                if(data){
                    return null
                }
                    return await Patients.create(userData)   
            }
            const data=await Patients.findOne({email:userData.email})
            if(data){
                return null
            }
            return await Patients.create(userData);
        }catch(err){
            throw err
        }
    }
    async patientFetch(): Promise<Patient[] | null> {
        try{
            return await Patients.find().select('-password')
        }catch(err){
            throw err
        }
    }
    async fetchPatient(id: string): Promise<Patient | null> {
        try{
            return await Patients.findOne({_id:id}).select('-password')
        }catch(err){
            throw err
        }
    }
    async singlePatient(userData: Partial<Patient>): Promise<Patient | null> {
        try{
            return await Patients.findOne({email:userData.email}).exec()
        }catch(err){
            throw err
        }
    }
    async bookings(doctorId: string): Promise<BookingAndSlots | null> {
        try{
            let currentDay=new Date()
            const List=await Booking.find({doctorId:doctorId,date:{$gte:currentDay},status:'Active'})
            const Slot=await Slots.find({doctorId:doctorId,date:{$gte:currentDay}})
            return {List,Slot}
        }catch(err){
            throw err
        }
    }
    async postbookings(userData: Partial<IBooking>): Promise<IBooking | null> {
        try{
            return await Booking.create(userData)
        }catch(err){
            throw err
        }
    }
    async yourBooking(patientId: string): Promise<IBooking[] | null> {
        try{
            return await Booking.find({patientId:patientId}).populate({path:'doctorId'})
        }catch(err){
            throw err
        }
    }
    async findAppointments(id: string): Promise<IBooking | null> {
        try {
            return await Booking.findOne({_id:id})     
        } catch (err) {
            throw err
        }
    }
}
