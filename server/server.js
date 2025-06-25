import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import summarizeRoutes from './routes/summarizeRoutes.js';

import dotenv from 'dotenv';
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.use('/api', summarizeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));