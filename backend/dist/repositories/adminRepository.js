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
const adminModel_1 = __importDefault(require("../models/adminModel"));
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
class adminRepository {
    signupAdmin(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield adminModel_1.default.findOne({ email: userData.email });
                if (data) {
                    return null;
                }
                return yield adminModel_1.default.create(userData);
            }
            catch (err) {
                throw err;
            }
        });
    }
    bookingList(page, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formatDate = (today) => {
                    const date = new Date(today);
                    const year = date.getUTCFullYear();
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(date.getUTCDate()).padStart(2, '0');
                    return `${year}-${month}-${day}T00:00:00.000+00:00`;
                };
                const formattedDate = formatDate(date);
                const bookings = yield bookingModel_1.default.find({ date: formattedDate }).populate({ path: 'doctorId' }).populate({ path: 'patientId' });
                const totalBookings = yield bookingModel_1.default.find({ date: formattedDate }).countDocuments();
                const totalPages = Math.ceil(totalBookings / 10);
                return { bookings, totalBookings, totalPages };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = adminRepository;
