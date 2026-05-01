import express from 'express';
import cors from 'cors';
import router from './app/router/router';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import expressSession from 'express-session';
import "./app/config/passport"
import { config } from './app/config';

const app = express();
// app.use(passport.session());

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(expressSession({
  secret : config.express_session_secret as string,
  resave : false,
  saveUninitialized : false
}));


app.use('/api/v1', router);

// test route
app.get('/', (req, res) => {
  res.send('API running 🚀');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
