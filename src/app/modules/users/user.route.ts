
import { userController } from './user.controller';
import validateRequest from '../../middleware/validationRequest';
import { createUserValidation } from './user.validation';
import { Router } from 'express';
import { checkauth } from '../../middleware/chekauth';
import { Role } from './user.interface';
const router = Router();



router.post('/register',validateRequest(createUserValidation),userController.createUser);
router.get("/all-users",checkauth("user","super_admin"),userController.getAllUsers);
router.patch("/:id",checkauth(...Object.values(Role)),userController.updateUser);
export const userRouter = router;
