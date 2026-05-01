import { Router } from "express";
import { divisionController } from "./division.controller";
import validateRequest from "../../middleware/validationRequest";
import { createDivisionZodSchema } from "./division.validation";
import { checkauth } from "../../middleware/chekauth";
import { Role } from "../users/user.interface";




const router = Router()

router.post("/create",checkauth(Role.ADMIN,Role.SUPER_ADMIN),validateRequest(createDivisionZodSchema),divisionController.CreateDivision);
router.get("/",divisionController.getAllDivision)
router.patch("/:id",checkauth(Role.ADMIN,Role.SUPER_ADMIN),divisionController.updateDivision)
router.delete("/:id",checkauth(Role.ADMIN,Role.SUPER_ADMIN),divisionController.deleteDivision)
export const divisionRouter = router