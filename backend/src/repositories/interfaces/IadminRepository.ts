import { Admin } from "../../models/adminModel"
import { IBooking } from "../../models/bookingModel"
export interface IadminRepository{
    signupAdmin(userData:Partial<Admin>):Promise<Admin|null>
    bookingList(page: string,date: string): Promise<{ bookings: IBooking[]; totalBookings: number; totalPages: number } | null>;
}