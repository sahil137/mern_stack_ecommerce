import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config({ path: 'server/config/.env' });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
