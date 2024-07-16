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
const doctorRespository_1 = __importDefault(require("../../repositories/doctorRespository"));
class doctorService {
    constructor() {
        this._doctorRepository = new doctorRespository_1.default();
    }
    signupDoctor(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._doctorRepository.signupDoctor(userData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    editDoctor(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            try {
                const data = yield this._doctorRepository.singleDoctor(userData);
                if (data) {
                    data.name = (_a = userData.name) !== null && _a !== void 0 ? _a : data.name;
                    data.email = (_b = userData.email) !== null && _b !== void 0 ? _b : data.email;
                    data.photo = (_c = userData.photo) !== null && _c !== void 0 ? _c : data.photo;
                    data.phone = (_d = userData.phone) !== null && _d !== void 0 ? _d : data.phone;
                    data.workingHospitalContact = (_e = userData.workingHospitalContact) !== null && _e !== void 0 ? _e : data.workingHospitalContact;
                    data.experienceYears = (_f = userData.experienceYears) !== null && _f !== void 0 ? _f : data.experienceYears;
                    data.dateOfBirth = (_g = userData.dateOfBirth) !== null && _g !== void 0 ? _g : data.dateOfBirth;
                    data.gender = (_h = userData.gender) !== null && _h !== void 0 ? _h : data.gender;
                    data.medicalLicenseNo = (_j = userData.medicalLicenseNo) !== null && _j !== void 0 ? _j : data.medicalLicenseNo;
                    data.currentWorkingHospital = (_k = userData.currentWorkingHospital) !== null && _k !== void 0 ? _k : data.currentWorkingHospital;
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
}
exports.default = doctorService;
