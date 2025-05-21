// controller/bookingController.js
import { createBooking, checkOverlap } from '../models/booking.js';
export const createBookingController = async (req, res) => {
  try {
    const data = req.body;

    const isOverlap = await checkOverlap(
      data.booking_date,
      data.booking_type,
      data.booking_slot,
      data.time_from,
      data.time_to
    );

    if (isOverlap) {
      return res.status(400).json({ message: 'Booking overlaps with an existing one' });
    }

    const result = await createBooking(data);
    res.status(201).json({ message: 'Booking created successfully', bookingId: result.insertId });

  } catch (error) {
    console.error('❌ Booking Error:', error); // ADD THIS
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
