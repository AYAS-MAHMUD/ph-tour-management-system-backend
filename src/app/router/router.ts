import { Router } from 'express';
import { userRouter } from '../modules/users/user.route';

const router = Router();
const routes = [
    {
        path : '/users',
        route : userRouter,
    },
]

routes.forEach((r)=> router.use(r.path,r.route));

export default router;
