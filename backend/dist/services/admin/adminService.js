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
const adminRepository_1 = __importDefault(require("../../repositories/adminRepository"));
const patientRepository_1 = __importDefault(require("../../repositories/patientRepository"));
const doctorRespository_1 = __importDefault(require("../../repositories/doctorRespository"));
class adminService {
    constructor() {
        this._adminRepository = new adminRepository_1.default;
        this._patientsRepository = new patientRepository_1.default;
        this._doctorRepository = new doctorRespository_1.default;
    }
    signupAdmin(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._adminRepository.signupAdmin(userData);
            }
            catch (err) {
                throw err;
            }
        });
    }
    patient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._patientsRepository.patientFetch();
            }
            catch (err) {
                throw err;
            }
        });
    }
    doctors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._doctorRepository.doctorFetch();
            }
            catch (err) {
                throw err;
            }
        });
    }
    blockUnblockDoctors(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._doctorRepository.fetchDoctor(id);
                if (data) {
                    data.is_Blocked = !status;
                    yield data.save();
                    return data;
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
    blockUnblockPatients(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._patientsRepository.fetchPatient(id);
                if (data) {
                    data.is_Blocked = !status;
                    yield data.save();
                    return data;
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
    documentsVerify(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._doctorRepository.fetchDoctor(id);
                if (data) {
                    data.documents_verified = true;
                    yield data.save();
                    return data;
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
    bookingList(page, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._adminRepository.bookingList(page, date);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = adminService;
