"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)('Patients', new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: '' },
    phone: { type: String, default: '' },
    gender: { type: String, default: '' },
    address: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' },
    country: { type: String, default: '' }, // Address is required
    is_Verified: { type: Boolean, default: false },
    is_Blocked: { type: Boolean, default: false },
    favourite_doctors: [{
            id: { type: String },
            name: { type: String },
            specialization: { type: String }
        }],
    appointments: [{
            id: { type: String }
        }],
    notifications: [{
            id: { type: String }
        }],
    photo: { type: String, default: '' }
}, { timestamps: true }));
