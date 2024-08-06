import Item from '../models/Item.js';

export const getItemsInStorage = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const addItem = async (req, res) => {
  const { name, quantity, price } = req.body;

  try {
    const item = new Item({ name, quantity, price });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateItem = async (req, res) => {
  const { name, quantity, price } = req.body;

  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, quantity, price },
      { new: true }
    );
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
