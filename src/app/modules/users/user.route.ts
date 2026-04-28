import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validationRequest';
import { createUserValidation } from './user.validation';

const router = Router();



router.post('/register',validateRequest(createUserValidation),userController.createUser);
router.get("/all-users",userController.getAllUsers)
export const userRouter = router;
