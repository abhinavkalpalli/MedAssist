"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const slotModel_1 = __importDefault(require("../models/slotModel"));
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
class doctorRepository {
    signupDoctor(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield doctorModel_1.default.findOne({ email: userData.email });
                if (user) {
                    return null;
                }
                return yield doctorModel_1.default.create(userData);
            }
            catch (err) {
                throw err;
            }
        });
    }
    doctorFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctorModel_1.default.find().select('-password');
            }
            catch (err) {
                throw err;
            }
        });
    }
    fetchDoctor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctorModel_1.default.findOne({ _id: id }).select('-password');
            }
            catch (err) {
                throw err;
            }
        });
    }
    singleDoctor(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctorModel_1.default.findOne({ email: userData.email }).select('-password');
            }
            catch (err) {
                throw err;
            }
        });
    }
    slotUpdate(id, date, slots) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield slotModel_1.default.findOneAndUpdate({ doctorId: id, date: new Date(date) }, { $set: { shifts: slots } }, { new: true, upsert: true }).exec();
            }
            catch (err) {
                throw err;
            }
        });
    }
    fetchSlots(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inputDate = new Date(date);
                const isoDateString = inputDate.toISOString().split("T")[0];
                const slots = yield slotModel_1.default.findOne({ doctorId: id, date: isoDateString });
                return slots;
            }
            catch (error) {
                throw new Error('Error fetching slots');
            }
        });
    }
    fetchDoctorsForPatient(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mongoQuery = {
                    is_Verified: query.is_Verified,
                    is_Blocked: query.is_Blocked,
                    documents_verified: query.documents_verified
                };
                if (query.experienceYears)
                    mongoQuery.experienceYears = query.experienceYears;
                if (query.gender)
                    mongoQuery.gender = query.gender;
                if (query.name)
                    mongoQuery.name = { $regex: query.name, $options: "i" };
                const doctors = yield doctorModel_1.default.find(mongoQuery)
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .exec();
                const count = yield doctorModel_1.default.countDocuments(query);
                return { doctors, totalPages: Math.ceil(count / limit), currentPage: page };
            }
            catch (err) {
                throw new Error("Error getting list.");
            }
        });
    }
    appointments(doctorId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inputDate = new Date(date);
                const isoDateString = inputDate.toISOString().split("T")[0];
                return yield bookingModel_1.default.find({ doctorId: doctorId, date: isoDateString }).populate({ path: 'patientId' });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = doctorRepository;
