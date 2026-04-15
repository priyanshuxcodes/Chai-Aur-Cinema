import * as bookingService from "../services/booking.service.js";

export const getSeats = async (req, res) => {
  const seats = await bookingService.getSeats();
  res.json(seats);
};

export const bookSeat = async (req, res) => {
  try {
    const data = await bookingService.bookSeat(
      req.params.id,
      req.user.id
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const myBookings = async (req, res) => {
  const bookings = await bookingService.getMyBookings(req.user.id);
  res.json(bookings);
};