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
                    if (userData == null) {
                        return res.status(400).json({ message: 'User already registered' });
                    }
                    if (userData === null || userData === void 0 ? void 0 : userData.photo) {
                        return res.status(200).json({ message: 'user already registered', email });
                    }
                    return res.status(201).json({
                        message: "Google signup registered",
                        email,
                    });
                }
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const data = { name, email, address, phone, gender, state, pincode, country, password: hashedPassword, photo };
                    const userData = yield this._patientService.signupPatient(data);
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
}
exports.default = patientController;
