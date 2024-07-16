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
                    if (userData == null) {
                        return res.status(400).json({ message: 'User Exists' });
                    }
                    return res.status(201).json({
                        message: "Google signup registered",
                        email
                    });
                }
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const data = { name, email, address, phone, gender, state, pincode, country, password: hashedPassword, photo, expertise, dateOfBirth, languageKnown, currentWorkingHospital, workingDays };
                    const userData = yield this._doctorService.signupDoctor(data);
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
                const { name, email, photo, currentWorkingHospital, dateOfBirth, experienceYears, gender, medicalLicenseNo, phone, workingHospitalContact } = req.body;
                const userData = { name, email, photo };
                const data = yield this._doctorService.editDoctor(userData);
                return res.status(200).json({ message: 'Profile Updated', name, email, photo, currentWorkingHospital, dateOfBirth, experienceYears, gender, medicalLicenseNo, phone, workingHospitalContact });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = doctorController;
