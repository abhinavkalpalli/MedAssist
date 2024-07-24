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
const patientService_1 = __importDefault(require("../services/patient/patientService"));
const verificationService_1 = __importDefault(require("../services/patient/verificationService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = __importDefault(require("../middleware/jwt"));
class patientController {
    constructor() {
        this._patientService = new patientService_1.default();
        this._verificationService = new verificationService_1.default();
    }
    signupPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, address, phone, gender, state, pincode, country, password, photo, is_Verified } = req.body;
                if (photo) {
                    const data = { name, email, photo, is_Verified };
                    const userData = yield this._patientService.signupPatient(data);
                    let tokens = yield (0, jwt_1.default)(data);
                    if (userData === null) {
                        const existingUser = yield this._verificationService.singlePatient(email);
                        if (!(existingUser === null || existingUser === void 0 ? void 0 : existingUser.is_Blocked)) {
                            return res.status(201).json({ message: 'GoolgeAuth', email, photo: existingUser === null || existingUser === void 0 ? void 0 : existingUser.photo, name: existingUser === null || existingUser === void 0 ? void 0 : existingUser.name, is_Blocked: existingUser === null || existingUser === void 0 ? void 0 : existingUser.is_Blocked, _id: existingUser === null || existingUser === void 0 ? void 0 : existingUser._id, tokens });
                        }
                        else {
                            return res.status(403).json({ message: 'User is blocked' });
                        }
                    }
                    else {
                        if (!(userData === null || userData === void 0 ? void 0 : userData.is_Blocked)) {
                            return res.status(201).json({
                                message: "Google signup registered",
                                email, photo: userData === null || userData === void 0 ? void 0 : userData.photo, name: userData === null || userData === void 0 ? void 0 : userData.name, is_Blocked: userData === null || userData === void 0 ? void 0 : userData.is_Blocked, _id: userData === null || userData === void 0 ? void 0 : userData._id, tokens
                            });
                        }
                        else {
                            res.status(403).json({ message: 'User is blocked' });
                        }
                    }
                }
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const data = { name, email, address, phone, gender, state, pincode, country, password: hashedPassword, photo };
                    const userData = yield this._patientService.signupPatient(data);
                    if (userData === null) {
                        return res.status(400).json({ message: 'User Exists' });
                    }
                    const otp = this._verificationService.generateOtp();
                    yield this._verificationService.SendOtpEmail(email, 'Your OTP Code', otp);
                    return res.status(201).json({
                        message: "Patient registered successfully and OTP sent",
                        email,
                        otp,
                        photo,
                        name
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    editPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, photo } = req.body;
                const userData = { name, email, photo };
                const data = yield this._patientService.editPatient(userData);
                return res.status(200).json({ message: 'Profile Updated', name, email, photo });
            }
            catch (err) {
                throw err;
            }
        });
    }
    doctors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit, experience, gender, search } = req.query;
                let query = {
                    is_Verified: true,
                    is_Blocked: false,
                    documents_verified: true,
                    experienceYears: experience ? parseInt(experience) : undefined,
                    gender: gender,
                    name: search ? { $regex: search, $options: "i" } : undefined,
                };
                const data = yield this._patientService.doctors(query, parseInt(page), parseInt(limit));
                return res.status(200).json({ data });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getbookings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorId } = req.query;
                const data = yield this._patientService.bookings(doctorId);
                return res.status(200).json({ List: data === null || data === void 0 ? void 0 : data.List, Slots: data === null || data === void 0 ? void 0 : data.Slot });
            }
            catch (err) {
                throw err;
            }
        });
    }
    postBooking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorId, patientId, shift, date } = req.body;
                const UserData = { doctorId, patientId, shift, date };
                const data = yield this._patientService.postbookings(UserData);
                return res.status(200).json({ message: 'Booked', data });
            }
            catch (err) {
                throw err;
            }
        });
    }
    yourBooking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patientId } = req.params;
                const data = yield this._patientService.yourBooking(patientId);
                return res.status(200).json({ message: 'Appointments', data });
            }
            catch (err) {
            }
        });
    }
    cancelAppointment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield this._patientService.cancelAppointment(id);
                if (data) {
                    return res.status(200).json({ message: 'Appointment Cancelled' });
                }
                else {
                    return res.status(500).json({ message: 'Internal error' });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = patientController;
