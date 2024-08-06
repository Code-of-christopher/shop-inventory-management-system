import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import inventoryRoutes from './routes/inventory.js';
import salesRoutes from './routes/sales.js';
import reportsRoutes from './routes/reports.js';
import { authenticate } from './middlewares/authenticate.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/items', authenticate, inventoryRoutes);
app.use('/sales', authenticate, salesRoutes);
app.use('/reports', authenticate, reportsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
