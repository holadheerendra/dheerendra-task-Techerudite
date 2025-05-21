
import db from '../config/db.js';


export const createBooking = async (data) => {
  const [result] = await db.execute(
    `INSERT INTO bookings (customer_name, customer_email, booking_date, booking_type, booking_slot, time_from, time_to) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.customer_name,
      data.customer_email,
      data.booking_date,
      data.booking_type,
      data.booking_slot || null,
      data.time_from || null,
      data.time_to || null
    ]
  );
  return result;
};

export const checkOverlap = async (date, type, slot, time_from, time_to) => {
  const [rows] = await db.execute(
    `SELECT * FROM bookings WHERE booking_date = ?`,
    [date]
  );
  for (let booking of rows) {
    if (booking.booking_type === 'Full Day' || type === 'Full Day') return true;
    if (booking.booking_type === 'Half Day' && booking.booking_slot === slot) return true;
    if (booking.booking_type === 'Custom') {
      if (
        (time_from < booking.time_to && time_to > booking.time_from) ||
        (booking.booking_type === 'Half Day' && slot === 'First Half' && time_from < '13:00')
      ) return true;
    }
  }
  return false;
};