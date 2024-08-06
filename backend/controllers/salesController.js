import Sale from '../models/Sale.js';
import Item from '../models/Item.js';

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('item');
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const addSale = async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    const total = item.price * quantity;
    const sale = new Sale({ item: itemId, quantity, total });

    await sale.save();

    // Update item stock
    item.quantity -= quantity;
    await item.save();

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
