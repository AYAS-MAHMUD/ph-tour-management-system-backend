import express from 'express';
import cors from 'cors';
import router from './app/router/router';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

// test route
app.get('/', (req, res) => {
  res.send('API running 🚀');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
