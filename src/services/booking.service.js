import pool from "../db/db.js";

export const getSeats = async () => {
  const result = await pool.query("SELECT * FROM seats ORDER BY id");
  return result.rows;
};

export const bookSeat = async (seatId, userId) => {
  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    // lock row
    const result = await conn.query(
      "SELECT * FROM seats WHERE id=$1 AND isbooked=0 FOR UPDATE",
      [seatId]
    );

    if (result.rowCount === 0) {
      throw new Error("Seat already booked");
    }

    // prevent duplicate booking by same user
    const already = await conn.query(
      "SELECT * FROM seats WHERE id=$1 AND user_id=$2",
      [seatId, userId]
    );

    if (already.rowCount > 0) {
      throw new Error("You already booked this seat");
    }

    await conn.query(
      "UPDATE seats SET isbooked=1, user_id=$2 WHERE id=$1",
      [seatId, userId]
    );

    await conn.query("COMMIT");

    return { message: "Seat booked successfully" };
  } catch (err) {
    await conn.query("ROLLBACK");
    throw err;
  } finally {
    conn.release();
  }
};

export const getMyBookings = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM seats WHERE user_id=$1",
    [userId]
  );

  return result.rows;
};