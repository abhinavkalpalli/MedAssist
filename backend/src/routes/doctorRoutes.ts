import { Router } from "express";
import doctorController from "../controllers/doctorController";
import verificationController from "../controllers/verificationController";
import protectdoctor from "../middleware/authDoctor";


const router=Router()
const DoctorController=new doctorController()
const VerificationController=new verificationController
router.post('/register',DoctorController.signupDoctor.bind(DoctorController))
router.post('/otp-verification',VerificationController.otpverifydoctor.bind(VerificationController))
router.post('/forgotpassword',VerificationController.forgotpassword.bind(VerificationController))
router.post('/resetpassword',VerificationController.doctorresetpassword.bind(VerificationController))
router.post('/login',VerificationController.doctorlogin.bind(VerificationController))
router.put('/editDoctor',protectdoctor,DoctorController.editDoctor.bind(DoctorController))




export const doctorRoutes = router;

