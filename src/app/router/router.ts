import { Router } from 'express';
import { userRouter } from '../modules/users/user.route';
import { authRouter } from '../modules/auth/auth.route';
import { divisionRouter } from '../modules/division/division.route';
import { tourRouter } from '../modules/tour/tour.route';

const router = Router();
const routes = [
    {
        path : '/users',
        route : userRouter,
    },
    {
        path : '/auth',
        route : authRouter,
    },
    {
        path : '/division',
        route : divisionRouter
    },
    {
        path : '/tour',
        route : tourRouter
    }
]

routes.forEach((r)=> router.use(r.path,r.route));

export default router;
