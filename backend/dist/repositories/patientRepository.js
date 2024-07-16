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
class PatientRepository {
    signupPatient(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (userData.photo) {
                    const data = yield patientModel_1.default.findOne({ email: userData.email });
                    if (data) {
                        return data;
                    }
                    else {
                        return yield patientModel_1.default.create(userData);
                    }
                }
                const data = yield patientModel_1.default.findOne({ email: userData.email });
                if (data) {
                    return null;
                }
                return yield patientModel_1.default.create(userData);
            }
            catch (err) {
                throw err;
            }
        });
    }
    patientFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patientModel_1.default.find().select('-password');
            }
            catch (err) {
                throw err;
            }
        });
    }
    fetchPatient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patientModel_1.default.findOne({ _id: id }).select('-password');
            }
            catch (err) {
                throw err;
            }
        });
    }
    singlePatient(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patientModel_1.default.findOne({ email: userData.email }).exec();
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = PatientRepository;
