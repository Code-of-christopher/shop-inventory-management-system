import { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const AddItem = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/items', { name, quantity, price });
      navigate('/');
    } catch (error) {
      setError('Failed to add item');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Item
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Quantity"
          type="number"
          fullWidth
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          inputProps={{ min: 0 }}
          required
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          inputProps={{ min: 0 }}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Item
        </Button>
      </form>
    </Box>
  );
};

export default AddItem;
