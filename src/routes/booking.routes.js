import express from "express";
import {
  getSeats,
  bookSeat,
  myBookings,
} from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/seats", getSeats);
router.put("/book/:id", authMiddleware, bookSeat);
router.get("/my-bookings", authMiddleware, myBookings);

export default router;