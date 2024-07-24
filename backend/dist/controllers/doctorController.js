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
const doctorService_1 = __importDefault(require("../services/doctor/doctorService"));
const verificationService_1 = __importDefault(require("../services/patient/verificationService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = __importDefault(require("../middleware/jwt"));
class doctorController {
    constructor() {
        this._doctorService = new doctorService_1.default();
        this._verificationService = new verificationService_1.default();
    }
    signupDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, address, phone, gender, state, pincode, country, password, photo, is_Verified, expertise, dateOfBirth, languageKnown, currentWorkingHospital, workingDays } = req.body;
                if (photo) {
                    const data = { name, email, photo, is_Verified };
                    const userData = yield this._doctorService.signupDoctor(data);
                    let tokens = yield (0, jwt_1.default)(data);
                    if (userData === null) {
                        const existingUser = yield this._verificationService.doctorlogin(email);
                        if (!(existingUser === null || existingUser === void 0 ? void 0 : existingUser.is_Blocked)) {
                            return res.status(201).json({ message: 'GoolgeAuth', name: existingUser === null || existingUser === void 0 ? void 0 : existingUser.name, email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email, address: existingUser === null || existingUser === void 0 ? void 0 : existingUser.address, phone: existingUser === null || existingUser === void 0 ? void 0 : existingUser.phone, gender: existingUser === null || existingUser === void 0 ? void 0 : existingUser.gender, state: existingUser === null || existingUser === void 0 ? void 0 : existingUser.state, pincode: existingUser === null || existingUser === void 0 ? void 0 : existingUser.pincode, country: existingUser === null || existingUser === void 0 ? void 0 : existingUser.country, photo: existingUser === null || existingUser === void 0 ? void 0 : existingUser.photo, is_Verified: existingUser === null || existingUser === void 0 ? void 0 : existingUser.is_Verified, expertise: existingUser === null || existingUser === void 0 ? void 0 : existingUser.expertise, dateOfBirth: existingUser === null || existingUser === void 0 ? void 0 : existingUser.dateOfBirth, languageKnown: existingUser === null || existingUser === void 0 ? void 0 : existingUser.languageKnown, currentWorkingHospital: existingUser === null || existingUser === void 0 ? void 0 : existingUser.currentWorkingHospital, workingDays: existingUser === null || existingUser === void 0 ? void 0 : existingUser.workingDays, experienceYears: existingUser === null || existingUser === void 0 ? void 0 : existingUser.experienceYears, medicalLicenseNo: existingUser === null || existingUser === void 0 ? void 0 : existingUser.medicalLicenseNo, workingHospitalContact: existingUser === null || existingUser === void 0 ? void 0 : existingUser.workingHospitalContact, documents: existingUser === null || existingUser === void 0 ? void 0 : existingUser.documents, _id: existingUser === null || existingUser === void 0 ? void 0 : existingUser._id, is_Blocked: existingUser === null || existingUser === void 0 ? void 0 : existingUser.is_Blocked, tokens });
                        }
                        else {
                            return res.status(403).json({ message: 'User is blocked' });
                        }
                    }
                    else {
                        if (!userData.is_Blocked) {
                            return res.status(201).json({ message: 'GoolgeAuth', name: userData === null || userData === void 0 ? void 0 : userData.name, email: userData === null || userData === void 0 ? void 0 : userData.email, address: userData === null || userData === void 0 ? void 0 : userData.address, phone: userData === null || userData === void 0 ? void 0 : userData.phone, gender: userData === null || userData === void 0 ? void 0 : userData.gender, state: userData === null || userData === void 0 ? void 0 : userData.state, pincode: userData === null || userData === void 0 ? void 0 : userData.pincode, country: userData === null || userData === void 0 ? void 0 : userData.country, photo: userData === null || userData === void 0 ? void 0 : userData.photo, is_Verified: userData === null || userData === void 0 ? void 0 : userData.is_Verified, expertise: userData === null || userData === void 0 ? void 0 : userData.expertise, dateOfBirth: userData === null || userData === void 0 ? void 0 : userData.dateOfBirth, languageKnown: userData === null || userData === void 0 ? void 0 : userData.languageKnown, currentWorkingHospital: userData === null || userData === void 0 ? void 0 : userData.currentWorkingHospital, workingDays: userData === null || userData === void 0 ? void 0 : userData.workingDays, experienceYears: userData === null || userData === void 0 ? void 0 : userData.experienceYears, medicalLicenseNo: userData === null || userData === void 0 ? void 0 : userData.medicalLicenseNo, workingHospitalContact: userData === null || userData === void 0 ? void 0 : userData.workingHospitalContact, documents: userData === null || userData === void 0 ? void 0 : userData.documents, _id: userData === null || userData === void 0 ? void 0 : userData._id, is_Blocked: userData === null || userData === void 0 ? void 0 : userData.is_Blocked, tokens });
                        }
                        else {
                            res.status(403).json({ message: 'User is blocked' });
                        }
                    }
                }
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const data = { name, email, address, phone, gender, state, pincode, country, password: hashedPassword, photo, expertise, dateOfBirth, languageKnown, currentWorkingHospital, workingDays };
                    const userData = yield this._doctorService.signupDoctor(data);
                    if (userData === null) {
                        return res.status(400).json({ message: 'User Exists' });
                    }
                    const otp = this._verificationService.generateOtp();
                    yield this._verificationService.SendOtpEmail(email, 'Your OTP Code', otp);
                    return res.status(201).json({
                        message: "Doctor registered successfully and OTP sent",
                        email,
                        otp
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    editDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, photo, currentWorkingHospital, dateOfBirth, experienceYears, gender, medicalLicenseNo, phone, workingHospitalContact, expertise } = req.body;
                const data = yield this._doctorService.editDoctor({ name, email, photo, currentWorkingHospital, dateOfBirth, experienceYears, gender, medicalLicenseNo, phone, workingHospitalContact, expertise });
                return res.status(200).json({ message: 'Profile Updated', name: data === null || data === void 0 ? void 0 : data.name, email: data === null || data === void 0 ? void 0 : data.email, photo: data === null || data === void 0 ? void 0 : data.photo, currentWorkingHospital: data === null || data === void 0 ? void 0 : data.currentWorkingHospital, dateOfBirth: data === null || data === void 0 ? void 0 : data.dateOfBirth, experienceYears: data === null || data === void 0 ? void 0 : data.experienceYears, gender: data === null || data === void 0 ? void 0 : data.gender, medicalLicenseNo: data === null || data === void 0 ? void 0 : data.medicalLicenseNo, phone: data === null || data === void 0 ? void 0 : data.phone, workingHospitalContact: data === null || data === void 0 ? void 0 : data.workingHospitalContact, expertise: data === null || data === void 0 ? void 0 : data.expertise, documents: data === null || data === void 0 ? void 0 : data.documents, _id: data === null || data === void 0 ? void 0 : data._id });
            }
            catch (err) {
                throw err;
            }
        });
    }
    uploadDocuments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, photo } = req.body;
                const data = yield this._doctorService.uploadDocuments({ email, photo });
                if (data) {
                    return res.status(200).json({ message: 'File uploaded', documents: data === null || data === void 0 ? void 0 : data.documents });
                }
                else {
                    return res.status(400).json({ message: 'Document failed to upload' });
                }
            }
            catch (err) {
            }
        });
    }
    deleteDocument(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, index } = req.params;
                const data = yield this._doctorService.deleteDocument(email, Number(index));
                if (data) {
                    return res.status(200).json({ message: 'Document Deleted', documents: data.documents });
                }
                else {
                    return res.status(400).json({ message: 'Deletion Of document falied' });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    slotUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, date, slots } = req.body;
                const data = yield this._doctorService.slotUpdate(id, date, slots);
                if (data) {
                    return res.status(200).json({ message: 'Slots updated' });
                }
                else {
                    return res.status(400).json({ message: 'Slots booking failed' });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    fetchSlots(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, date } = req.query;
                const data = yield this._doctorService.fetchSlots(id, date);
                if (data) {
                    return res.status(200).json({ message: 'Slots are fetched', Slots: data });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    appointments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, doctorId } = req.query;
                const data = yield this._doctorService.appointments(doctorId, date);
                return res.status(200).json({ messgage: 'Appointments', appointments: data });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = doctorController;
