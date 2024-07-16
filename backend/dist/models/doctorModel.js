"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const doctorSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, default: '' },
    password: { type: String, default: '' }, // Store hashed passwords
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
    is_Verified: { type: Boolean, default: false },
    is_Blocked: { type: Boolean, default: false },
    documents_verified: { type: Boolean, default: false },
    workingHospitalContact: { type: String, default: '' },
    experienceYears: { type: Number, default: 0 },
    medicalLicenseNo: { type: String, default: '' },
    documents: [],
    workingDays: { type: String, default: '' },
    appointments: [{
            id: { type: String }
        }],
    notifications: [{
            id: { type: String }
        }],
    photo: { type: String, default: '' }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Doctors', doctorSchema);
