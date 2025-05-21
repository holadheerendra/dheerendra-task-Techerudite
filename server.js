import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

import bookingRoutes from './routes/bookingRoutes.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Allow requests from specific origins (React frontend)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add all needed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/',bookingRoutes );

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
