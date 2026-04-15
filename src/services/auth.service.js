import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/db.js";

const JWT_SECRET = "SECRET";

export const registerUser = async ({ name, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,name,email",
    [name, email, hashed]
  );

  return result.rows[0];
};

export const loginUser = async ({ email, password }) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (result.rowCount === 0) throw new Error("User not found");

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};