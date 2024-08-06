import express from 'express';
import { getSales, addSale } from '../controllers/salesController.js';

const router = express.Router();

router.get('/', getSales);
router.post('/', addSale);

export default router;
