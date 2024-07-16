import { Schema, Document, model } from "mongoose";

export interface Appointment {
    id: string;
}

export interface Notification {
    id: string;
}

export interface Doctor extends Document {
    email: string;
    name: string;
    address: string;
    password: string,
    state: string;
    country: string;
    pincode: string;
    expertise: string;
    education: string;
    experienceYears:number;
    medicalLicenseNo:string;
    workingHospitalContact:string;
    dateOfBirth: string;
    languageKnown: string;
    phone: string;
    gender: string;
    is_Verified:boolean;
    is_Blocked: boolean;
    documents_verified:boolean;
    appointments?: Appointment[];
    notifications?: Notification[];
    documents?:string[]
    currentWorkingHospital: string;
    workingDays: string;
    photo?: string;
}

const doctorSchema = new Schema<Doctor>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, default: '' },
    password: { type: String, default:'' }, // Store hashed passwords
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    pincode: { type: String, default: '' },
    expertise: { type: String, default: '' },
    education: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    languageKnown: { type: String, default: '' },
    phone: { type: String, default: '' },
    gender: { type: String, default: '' },
    currentWorkingHospital: { type: String, default: '' },
    is_Verified:{ type: Boolean, default: false },
    is_Blocked: { type: Boolean, default: false },
    documents_verified:{type:Boolean,default:false},
    workingHospitalContact:{type:String,default:''},
    experienceYears:{type:Number,default:0},
    medicalLicenseNo:{type:String,default:''},
    documents:[],
    workingDays: { type: String, default: '' },
    appointments: [{
        id: { type: String }
    }],
    notifications: [{
        id: { type: String }
    }],
    photo: { type: String,default:'' }
}, { timestamps: true });

export default model<Doctor>('Doctors', doctorSchema);
