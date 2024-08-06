import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config.js';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { username, email },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
