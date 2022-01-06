import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// index route import
import indexRoute from './routes/indexRoute.js';
import connectToDatabase from './config/mongoose.js';
import { errorMiddleware } from './middleware/error.js';

const app = express();

dotenv.config({ path: 'server/config/.env' });

// connecting to database
connectToDatabase();

app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/', indexRoute);

// error middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
