import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(400).json({ msg: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const userId = await createUser({ first_name, last_name, email, password: hashed });

    res.status(201).json({status:true, msg: 'User registered successfully', userId });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({status:false, msg: "Email not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({status:true, msg: "Login successful", token, user: user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

