import Item from '../models/Item.js';
import Sale from '../models/Sale.js';

export const getReports = async (req, res) => {
  try {
    const totalItems = await Item.countDocuments();
    const totalSales = await Sale.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]);

    res.json({ totalItems, totalSales: totalSales[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
