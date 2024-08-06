import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import api from '../../api';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const { data } = await api.get('/sales');
        setSales(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch sales');
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  if (loading) return <CircularProgress />;

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Sales
      </Typography>
      <List>
        {sales.map((sale) => (
          <ListItem key={sale._id} sx={{ borderBottom: '1px solid #ccc' }}>
            <ListItemText
              primary={`${sale.item.name} - Quantity: ${sale.quantity}`}
              secondary={`Total: $${sale.total} - Date: ${new Date(sale.date).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sales;
