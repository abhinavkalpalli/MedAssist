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
// src/services/patient/verificationService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const verificationRepository_1 = __importDefault(require("../../repositories/verificationRepository"));
const console_1 = require("console");
dotenv_1.default.config({ path: (0, path_1.join)('./src', '.env') });
class VerificationService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS,
            },
        });
        this._verificationRepository = new verificationRepository_1.default();
    }
    resetpassword(email, hashedpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this._verificationRepository.resetpassord(email);
                if (userData) {
                    userData.password = hashedpassword;
                    yield userData.save();
                    return userData;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    optverify(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this._verificationRepository.otpverify(email);
                if (userData) {
                    userData.is_Verified = true;
                    yield userData.save();
                    return userData;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    optverifydoctor(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this._verificationRepository.otpverifydoctor(email);
                if (userData) {
                    userData.is_Verified = true;
                    yield userData.save();
                    return userData;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    adminotpverify(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this._verificationRepository.otpverifyadmin(email);
                if (userData) {
                    userData.is_Verified = true;
                    yield userData.save();
                    return userData;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    doctorresetpassword(email, hashedpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this._verificationRepository.doctorresetpassord(email);
                if (userData) {
                    userData.password = hashedpassword;
                    yield userData.save();
                    return userData;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    adminresetpassword(email, hashedpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this._verificationRepository.adminLogin(email);
                if (userData) {
                    userData.password = hashedpassword;
                    yield userData.save();
                    return userData;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    patientlogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this._verificationRepository.patientLogin(email);
                return userData;
            }
            catch (err) {
                throw err;
            }
        });
    }
    doctorlogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this._verificationRepository.doctorLogin(email);
                return userData;
            }
            catch (err) {
                throw err;
            }
        });
    }
    adminlogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this._verificationRepository.adminLogin(email);
                return userData;
            }
            catch (err) {
                throw err;
            }
        });
    }
    SendOtpEmail(to, subject, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.USER_MAIL,
                to,
                subject,
                text: `Your OTP code is ${otp}`,
                html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
            };
            try {
                yield this.transporter.sendMail(mailOptions);
            }
            catch (error) {
                console.error('Error sending OTP Email:', error);
                throw new Error('Failed to send OTP Email');
            }
        });
    }
    singlePatient(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._verificationRepository.patientLogin(email);
            }
            catch (_a) {
                throw console_1.error;
            }
        });
    }
    generateOtp() {
        return otp_generator_1.default.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
    }
}
exports.default = VerificationService;
