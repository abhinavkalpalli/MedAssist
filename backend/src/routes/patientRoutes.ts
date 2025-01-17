import { Router } from "express";
import patientController from "../controllers/patientController";
import verificationController from "../controllers/verificationController";
import protect from "../middleware/authMiddleware";

const router=Router()
const PatientController=new patientController
const VerificationController=new verificationController
router.post('/register',PatientController.signupPatient.bind(PatientController))
router.post('/otp-verification',VerificationController.otpverify.bind(VerificationController))
router.post('/forgotpassword',VerificationController.forgotpassword.bind(VerificationController))
router.post('/resetpassword',VerificationController.resetpassword.bind(VerificationController))
router.post('/login',VerificationController.patientlogin.bind(VerificationController))
router.put('/editPatient',PatientController.editPatient.bind(PatientController))
router.get('/doctors',PatientController.doctors.bind(PatientController))
router.get('/bookings',PatientController.getbookings.bind(PatientController))
router.post('/postBooking',PatientController.postBooking.bind(PatientController))
router.get('/:patientId/yourBooking',PatientController.yourBooking.bind(PatientController))
router.get('/cancelAppointment/:id',PatientController.cancelAppointment.bind(PatientController))
export const patientRoutes = router;