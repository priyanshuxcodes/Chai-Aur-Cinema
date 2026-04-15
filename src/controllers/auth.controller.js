import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerUser(name, email, password);
  res.json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await loginUser(email, password);
  res.json({ token });
};