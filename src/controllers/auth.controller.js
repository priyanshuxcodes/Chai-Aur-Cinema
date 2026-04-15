import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body);
    res.json({ success: true, token });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};