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
const patientRepository_1 = __importDefault(require("../../repositories/patientRepository"));
const doctorRespository_1 = __importDefault(require("../../repositories/doctorRespository"));
class patientService {
    constructor() {
        this._patientRepository = new patientRepository_1.default();
        this._doctorRepository = new doctorRespository_1.default();
    }
    signupPatient(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._patientRepository.signupPatient(userData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    editPatient(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const data = yield this._patientRepository.singlePatient(userData);
                if (data) {
                    data.name = (_a = userData.name) !== null && _a !== void 0 ? _a : data.name;
                    data.email = (_b = userData.email) !== null && _b !== void 0 ? _b : data.email;
                    data.photo = (_c = userData.photo) !== null && _c !== void 0 ? _c : data.photo;
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
    doctors(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._doctorRepository.fetchDoctorsForPatient(query, page, limit);
            }
            catch (err) {
                throw err;
            }
        });
    }
    bookings(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._patientRepository.bookings(doctorId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    postbookings(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._patientRepository.postbookings(userData);
            }
            catch (err) {
                throw err;
            }
        });
    }
    yourBooking(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._patientRepository.yourBooking(patientId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    cancelAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._patientRepository.findAppointments(id);
                if (data) {
                    data.status = 'Cancelled';
                    data.save();
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
}
exports.default = patientService;
