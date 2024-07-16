import { Router } from "express";
import adminController from "../controllers/adminController";
import verificationController from "../controllers/verificationController";
import protectadmin from "../middleware/authAdmin";


const router=Router()
const AdminController=new adminController()
const VerificationController=new verificationController()

router.post('/register',AdminController.signupAdmin.bind(AdminController))
router.post('/login',VerificationController.adminlogin.bind(VerificationController))
router.get('/patients',protectadmin,AdminController.patients.bind(AdminController))
router.get('/doctors',protectadmin,AdminController.doctors.bind(AdminController))
router.patch('/doctor/:userId/blockUnblock',protectadmin,AdminController.blockUnblockDoctor.bind(AdminController))
router.patch('/patient/:userId/blockUnblock',protectadmin,AdminController.blockUnblockPatient.bind(AdminController))

export const adminRoutes = router;
