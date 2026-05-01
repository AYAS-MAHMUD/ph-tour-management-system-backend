import { Router } from 'express';
import { userRouter } from '../modules/users/user.route';
import { authRouter } from '../modules/auth/auth.route';

const router = Router();
const routes = [
    {
        path : '/users',
        route : userRouter,
    },
    {
        path : '/auth',
        route : authRouter,
    }
]

routes.forEach((r)=> router.use(r.path,r.route));

export default router;
