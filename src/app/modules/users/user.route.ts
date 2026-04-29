
import { userController } from './user.controller';
import validateRequest from '../../middleware/validationRequest';
import { createUserValidation } from './user.validation';
import { Router } from 'express';
import { checkauth } from '../../middleware/chekauth';
const router = Router();



router.post('/register',validateRequest(createUserValidation),userController.createUser);
router.get("/all-users",checkauth("user","Super_Admin"),userController.getAllUsers)
export const userRouter = router;
