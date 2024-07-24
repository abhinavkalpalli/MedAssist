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
const patientModel_1 = __importDefault(require("../models/patientModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
class verificatioRepository {
    otpverify(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patientModel_1.default.findOne({ email }).exec();
            }
            catch (error) {
                throw error;
            }
        });
    }
    otpverifydoctor(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctorModel_1.default.findOne({ email }).exec();
            }
            catch (error) {
                throw error;
            }
        });
    }
    otpverifyadmin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield adminModel_1.default.findOne({ email }).exec();
            }
            catch (error) {
                throw error;
            }
        });
    }
    resetpassord(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patientModel_1.default.findOne({ email }).exec();
            }
            catch (err) {
                throw err;
            }
        });
    }
    doctorresetpassord(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctorModel_1.default.findOne({ email }).exec();
            }
            catch (err) {
                throw err;
            }
        });
    }
    patientLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patientModel_1.default.findOne({ email }).exec();
            }
            catch (err) {
                throw err;
            }
        });
    }
    doctorLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctorModel_1.default.findOne({ email }).exec();
            }
            catch (err) {
                throw err;
            }
        });
    }
    adminLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield adminModel_1.default.findOne({ email }).exec();
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = verificatioRepository;
