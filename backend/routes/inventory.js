import express from 'express';
import { getItemsInStorage, addItem, getItemById, updateItem } from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/in-storage', getItemsInStorage);
router.post('/', addItem);
router.get('/:id', getItemById);
router.put('/:id', updateItem);

export default router;
