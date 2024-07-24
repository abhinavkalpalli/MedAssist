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
const adminService_1 = __importDefault(require("../services/admin/adminService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const verificationService_1 = __importDefault(require("../services/patient/verificationService"));
class adminController {
    constructor() {
        this._adminService = new adminService_1.default();
        this._verificationService = new verificationService_1.default();
    }
    signupAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const data = { email, password: hashedPassword };
                const adminData = yield this._adminService.signupAdmin(data);
                if (adminData == null) {
                    return res.status(400).json({ message: 'User exists' });
                }
                else {
                    const otp = this._verificationService.generateOtp();
                    yield this._verificationService.SendOtpEmail(email, 'Your OTP Code', otp);
                    return res.status(201).json({
                        message: "Admin registered successfully and OTP sent",
                        email, otp
                    });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    patients(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._adminService.patient();
                return res.status(200).json({ data });
            }
            catch (err) {
                throw err;
            }
        });
    }
    doctors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._adminService.doctors();
                return res.status(200).json({ data });
            }
            catch (err) {
                throw err;
            }
        });
    }
    blockUnblockDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.body;
                const { userId } = req.params;
                const data = yield this._adminService.blockUnblockDoctors(userId, status);
                if (data) {
                    return res.status(200).json({ message: 'user status changed' });
                }
                else {
                    return res.status(500).json({ message: 'Internal server error' });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    blockUnblockPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.body;
                const { userId } = req.params;
                const data = yield this._adminService.blockUnblockPatients(userId, status);
                if (data) {
                    return res.status(200).json({ message: 'user status changed' });
                }
                else {
                    return res.status(500).json({ message: 'Internal server error' });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    documentsVerify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const data = yield this._adminService.documentsVerify(userId);
                if (data) {
                    return res.status(200).json({ message: 'Document Verified' });
                }
                else {
                    return res.status(400).json({ message: 'Internal Error' });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    bookingList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, date } = req.query;
                const data = yield this._adminService.bookingList(page, date);
                if (data) {
                    return res.status(200).json({ message: 'Bookings', bookings: data.bookings, totalPages: data.totalPages, totalBookings: data.totalBookings });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = adminController;
