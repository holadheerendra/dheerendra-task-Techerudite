import express from 'express';
import { createBookingController } from '../controllers/bookingController.js';
const router = express.Router();

router.post('/bookings', createBookingController);
export default router;
