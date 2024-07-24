import { Patient } from "../../models/patientModel";
import { IpatientService } from "./interfaces/IpatientService";
import PatientRepository from "../../repositories/patientRepository";

import { log } from "console";
import { Doctor, DoctorQuery } from "../../models/doctorModel";
import doctorRepository from "../../repositories/doctorRespository";
import { PaginatedDoctors } from "../../repositories/interfaces/IdoctorRepository";
import { BookingAndSlots, IBooking } from "../../models/bookingModel";

export default class patientService implements IpatientService{
    private _patientRepository:PatientRepository
    private _doctorRepository:doctorRepository
    constructor(){
        this._patientRepository=new PatientRepository()
        this._doctorRepository=new doctorRepository()
    }
     async signupPatient(userData: Partial<Patient>): Promise<Patient | null> {
         try{
            return await this._patientRepository.signupPatient(userData)
         }catch(error){
            throw error
         }
     }
     async editPatient(userData: Partial<Patient>): Promise<Patient | null> {
         try{
            const data=await this._patientRepository.singlePatient(userData)

            
            if(data){
                data.name = userData.name ?? data.name;
                data.email = userData.email ?? data.email;
                data.photo = userData.photo ?? data.photo;
                await data.save()
                return data
            }else{
                return null
            }
           
         }catch(err){
            throw err
         }
     }
     async doctors(query:DoctorQuery,page:number,limit:number): Promise<PaginatedDoctors | null> {
        try{
            return await this._doctorRepository.fetchDoctorsForPatient(query,page,limit)
        }catch(err){
            throw err
        }
     }
     async bookings(doctorId: string): Promise<BookingAndSlots | null> {
         try{
            return await this._patientRepository.bookings(doctorId)
         }catch(err){
            throw err
         }
     }
     async postbookings(userData: Partial<IBooking>): Promise<IBooking | null> {
         try{
            return await this._patientRepository.postbookings(userData)
         }catch(err){
            throw err
         }
     }
     async yourBooking(patientId: string): Promise<IBooking[] | null> {
         try{
            return await this._patientRepository.yourBooking(patientId)
         }catch(err){
            throw err
         }
     }
     async cancelAppointment(id: string): Promise<IBooking | null> {
         try{
            const data= await this._patientRepository.findAppointments(id)
            if(data){
                data.status='Cancelled'
                data.save()
                return data
            }else{
                return null
            }
         }catch(err){
            throw err
         }
     }
}