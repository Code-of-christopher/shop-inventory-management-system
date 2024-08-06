import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const AddSale = () => {
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await api.get('/items/in-storage');
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items', error);
      }
    };
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sales', { itemId, quantity });
      navigate('/sales');
    } catch (error) {
      console.error('Failed to add sale', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Sale
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Item</InputLabel>
          <Select
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
          >
            {items.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          type="number"
          fullWidth
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          inputProps={{ min: 1 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Sale
        </Button>
      </form>
    </Box>
  );
};

export default AddSale;
