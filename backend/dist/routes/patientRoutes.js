"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRoutes = void 0;
const express_1 = require("express");
const patientController_1 = __importDefault(require("../controllers/patientController"));
const verificationController_1 = __importDefault(require("../controllers/verificationController"));
const router = (0, express_1.Router)();
const PatientController = new patientController_1.default;
const VerificationController = new verificationController_1.default;
router.post('/register', PatientController.signupPatient.bind(PatientController));
router.post('/otp-verification', VerificationController.otpverify.bind(VerificationController));
router.post('/forgotpassword', VerificationController.forgotpassword.bind(VerificationController));
router.post('/resetpassword', VerificationController.resetpassword.bind(VerificationController));
router.post('/login', VerificationController.patientlogin.bind(VerificationController));
router.put('/editPatient', PatientController.editPatient.bind(PatientController));
exports.patientRoutes = router;
