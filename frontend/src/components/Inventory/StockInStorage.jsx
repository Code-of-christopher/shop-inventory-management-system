import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import api from '../../api';

const StockInStorage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchInStorageItems = async () => {
      try {
        const { data } = await api.get('/items/in-storage');
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items in storage', error);
      }
    };
    fetchInStorageItems();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Stock In Storage
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item._id}>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StockInStorage;
