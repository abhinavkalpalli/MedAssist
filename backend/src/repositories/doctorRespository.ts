
import Doctors, { Doctor, DoctorQuery } from "../models/doctorModel";
import { IdoctorRepository, PaginatedDoctors } from "./interfaces/IdoctorRepository";
import Slots,{ ISlot } from "../models/slotModel";
import Booking, { IBooking } from "../models/bookingModel";

export default class doctorRepository implements IdoctorRepository {
    async signupDoctor(userData: Partial<Doctor>): Promise<Doctor | null> {
        try {
            let user=await Doctors.findOne({email:userData.email})
            if(user){
                return null
            }
            return await Doctors.create(userData);
        }catch(err){
            throw err
        }
    }
    async doctorFetch(): Promise<Doctor[] | null> {
        try{
            return await Doctors.find().select('-password')
        }catch(err){
            throw err
        }
    }
    async fetchDoctor(id: string): Promise<Doctor | null> {
        try{
            return await Doctors.findOne({_id:id}).select('-password')
        }catch(err){
            throw err
        }
    }
    async singleDoctor(userData: Partial<Doctor>): Promise<Doctor | null> {
        try{
            return await Doctors.findOne({email:userData.email}).select('-password')
        }catch(err){
            throw err
        }
    }
    async slotUpdate(id: string, date: string, slots: string[]): Promise<ISlot> {
        try{
            return await Slots.findOneAndUpdate(
                { doctorId: id, date: new Date(date) }, 
                { $set: { shifts: slots } }, 
                { new: true, upsert: true } 
              ).exec();

        }catch(err){
            throw err
        }
    }
    async fetchSlots(id: string, date: string): Promise<ISlot | null> {
    try {
        const inputDate = new Date(date);
        const isoDateString = inputDate.toISOString().split("T")[0];
      const slots = await Slots.findOne({ doctorId: id, date: isoDateString });
      return slots;
    } catch (error) {
      throw new Error('Error fetching slots');
    }
        }
        async fetchDoctorsForPatient(query: DoctorQuery, page: number, limit: number): Promise<PaginatedDoctors | null> {
            try {
                let mongoQuery: any = {
                    is_Verified: query.is_Verified,
                    is_Blocked: query.is_Blocked,
                    documents_verified: query.documents_verified
                };
        
                if (query.experienceYears) mongoQuery.experienceYears = query.experienceYears;
                if (query.gender) mongoQuery.gender = query.gender;
                if (query.name) mongoQuery.name = { $regex: query.name, $options: "i" };
                
              const doctors = await Doctors.find(mongoQuery)
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();
              const count = await Doctors.countDocuments(query);
              return { doctors, totalPages: Math.ceil(count / limit), currentPage: page };
            } catch (err) {
              throw new Error("Error getting list.");
            }
    }
    async appointments(doctorId: string, date: string): Promise<IBooking[] | null> {
        try{
            const inputDate = new Date(date);
            const isoDateString = inputDate.toISOString().split("T")[0];
            return await Booking.find({doctorId:doctorId,date:isoDateString}).populate({path:'patientId'})
        }catch(err){
            throw err
        }
    }

}