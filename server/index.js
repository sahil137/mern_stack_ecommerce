import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';
import indexRoute from './routes/indexRoute.js';
import connectToDatabase from './config/mongoose.js';
import { errorMiddleware } from './middleware/error.js';

// handle uncaught exception
process.on('uncaughtException', (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

const app = express();

dotenv.config({ path: 'server/config/.env' });

// connecting to database
connectToDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());

app.use(cookieParser());

app.use('/', indexRoute);

// error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

// unhandled promise rejection
process.on('unhandledRejection', (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
