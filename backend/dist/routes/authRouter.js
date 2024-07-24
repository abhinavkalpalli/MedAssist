"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
const authMiddleware_1 = __importStar(require("../middleware/authMiddleware"));
const authController_1 = __importDefault(require("../controllers/authController"));
const authAdmin_1 = __importStar(require("../middleware/authAdmin"));
const authDoctor_1 = __importStar(require("../middleware/authDoctor"));
const verificationController_1 = __importDefault(require("../controllers/verificationController"));
const AuthController = new authController_1.default();
const VerificationController = new verificationController_1.default();
router.post('patient/refresh-token', authMiddleware_1.refreshAccessToken);
router.get('/patient', authMiddleware_1.default, AuthController.patientAuth.bind(AuthController));
router.post('/admin/refresh-token', authAdmin_1.refreshAccessTokenadmin);
router.get('/admin', authAdmin_1.default, AuthController.adminAuth.bind(AuthController));
router.post('doctor/refresh-token', authDoctor_1.refreshAccessTokenDoctor);
router.get('/doctor', authDoctor_1.default, AuthController.doctorAuth.bind(AuthController));
router.get('/resendotp', VerificationController.otpresend.bind(VerificationController));
exports.authRoutes = router;
