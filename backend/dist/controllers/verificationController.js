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
const verificationService_1 = __importDefault(require("../services/patient/verificationService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const console_1 = require("console");
const jwt_1 = __importDefault(require("../middleware/jwt"));
class verificationController {
    constructor() {
        this._verficationService = new verificationService_1.default();
    }
    otpverify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const data = yield this._verficationService.optverify(email);
                if (data) {
                    return res.status(200).json({ message: 'verified' });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    otpverifydoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const data = yield this._verficationService.optverifydoctor(email);
                if (data) {
                    return res.status(200).json({ message: 'verified' });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    adminotpverify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const data = yield this._verficationService.adminotpverify(email);
                if (data) {
                    return res.status(200).json({ message: 'verified' });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    forgotpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const otp = this._verficationService.generateOtp();
                const data = yield this._verficationService.SendOtpEmail(email, 'This is for your forgot password', otp);
                return res.status(200).json({ message: 'otp sent', email, otp });
            }
            catch (error) {
                throw error;
            }
        });
    }
    resetpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, oldPassword } = req.body;
                if (oldPassword) {
                    const user = yield this._verficationService.patientlogin(email);
                    if (user) {
                        const isMatch = yield bcrypt_1.default.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
                        if (isMatch) {
                            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                            const data = yield this._verficationService.resetpassword(email, hashedPassword);
                            return res.status(200).json({ message: 'Password changed' });
                        }
                        else {
                            return res.status(400).json({ message: 'Enter correct old password' });
                        }
                    }
                }
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const data = yield this._verficationService.resetpassword(email, hashedPassword);
                    return res.status(200).json({ message: 'Password changed' });
                }
            }
            catch (_a) {
                throw console_1.error;
            }
        });
    }
    adminforgotpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const otp = this._verficationService.generateOtp();
                const data = yield this._verficationService.SendOtpEmail(email, 'This is for your forgot password', otp);
                return res.status(200).json({ message: 'otp sent', email, otp, isAdmin: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    adminresetpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, oldPassword } = req.body;
                if (oldPassword) {
                    const user = yield this._verficationService.adminlogin(email);
                    if (user) {
                        const isMatch = yield bcrypt_1.default.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
                        if (isMatch) {
                            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                            const data = yield this._verficationService.adminresetpassword(email, hashedPassword);
                            return res.status(200).json({ message: 'Password changed' });
                        }
                        else {
                            return res.status(400).json({ message: 'Enter correct old password' });
                        }
                    }
                }
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const data = yield this._verficationService.adminresetpassword(email, hashedPassword);
                    return res.status(200).json({ message: 'Password changed' });
                }
            }
            catch (_a) {
                throw console_1.error;
            }
        });
    }
    doctorforgotpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const otp = this._verficationService.generateOtp();
                const data = yield this._verficationService.SendOtpEmail(email, 'This is for your forgot password', otp);
                return res.status(200).json({ message: 'otp sent', email, otp, isDoctor: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    doctorresetpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, oldPassword } = req.body;
                if (oldPassword) {
                    const user = yield this._verficationService.doctorlogin(email);
                    if (user) {
                        const isMatch = yield bcrypt_1.default.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
                        if (isMatch) {
                            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                            const data = yield this._verficationService.doctorresetpassword(email, hashedPassword);
                            return res.status(200).json({ message: 'Password changed' });
                        }
                        else {
                            return res.status(400).json({ message: 'Enter correct old password' });
                        }
                    }
                }
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const data = yield this._verficationService.doctorresetpassword(email, hashedPassword);
                    return res.status(200).json({ message: 'Password changed' });
                }
            }
            catch (_a) {
                throw console_1.error;
            }
        });
    }
    patientlogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const data = yield this._verficationService.patientlogin(email);
                if (data) {
                    const password2 = data.password;
                    const isMatch = yield bcrypt_1.default.compare(password, password2);
                    if (isMatch) {
                        const { name, photo, is_Blocked, _id } = data;
                        if (!is_Blocked) {
                            let tokens = yield (0, jwt_1.default)(data);
                            return res.status(200).json({ message: 'Patient Logged in', email, name, photo, _id: _id, tokens });
                        }
                        else {
                            return res.status(403).json({ message: 'User is blocked' });
                        }
                    }
                    else {
                        return res.status(401).json({ message: 'Password did not match' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'Patient not found' });
                }
            }
            catch (err) {
                console.error('Error during patient login', err);
                next(err);
            }
        });
    }
    doctorlogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const data = yield this._verficationService.doctorlogin(email);
                if (data) {
                    const password2 = data.password;
                    const isMatch = yield bcrypt_1.default.compare(password, password2);
                    if (isMatch) {
                        const { name, photo, is_Blocked, is_Verified, dateOfBirth, address, currentWorkingHospital, gender, expertise, workingDays, phone, workingHospitalContact, languageKnown, medicalLicenseNo, experienceYears, documents, _id } = data;
                        if (!is_Blocked) {
                            let tokens = yield (0, jwt_1.default)(data);
                            return res.status(200).json({ message: 'Doctor Logged in', email, name, photo, is_Blocked, is_Verified, dateOfBirth, address, currentWorkingHospital, gender, expertise, workingDays, phone, workingHospitalContact, languageKnown, medicalLicenseNo, experienceYears, documents, _id, tokens });
                        }
                        else {
                            return res.status(403).json({ message: 'User is blocked' });
                        }
                    }
                    else {
                        return res.status(401).json({ message: 'Password did not match' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'Doctor not found' });
                }
            }
            catch (err) {
                console.error('Error during patient login', err);
                next(err);
            }
        });
    }
    adminlogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const data = yield this._verficationService.adminlogin(email);
                if (data) {
                    const password2 = data.password;
                    const isMatch = yield bcrypt_1.default.compare(password, password2);
                    if (isMatch) {
                        const { email } = data;
                        let tokens = yield (0, jwt_1.default)(data);
                        return res.status(200).json({ message: 'Admin Logged in', email, tokens });
                    }
                    else {
                        return res.status(401).json({ message: 'Password did not match' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'Doctor not found' });
                }
            }
            catch (err) {
                console.error('Error during patient login', err);
                next(err);
            }
        });
    }
    otpresend(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.query;
                const otp = this._verficationService.generateOtp();
                const data = yield this._verficationService.SendOtpEmail(email, 'This is your new Otp', otp);
                return res.status(200).json({ message: 'otp sent', otp });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = verificationController;
