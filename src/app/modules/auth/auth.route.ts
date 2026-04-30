import { Router } from "express";
import { authController } from "./auth.controller";
import { checkauth } from "../../middleware/chekauth";
import { Role } from "../users/user.interface";
import passport from "passport";


const router = Router();


router.post("/login", authController.credentialLogin)
router.post("/refresh-token", authController.getNewAccessToken)
router.post("/logout",authController.logout)
router.post("/reset-password", checkauth(...Object.values(Role)),authController.resetPassword)
router.get("/google",authController.googleLogin)
router.get("/google/callback",passport.authenticate("google",{ failureRedirect: '/login'}),authController.googleLoginCallback)
export const authRouter = router;