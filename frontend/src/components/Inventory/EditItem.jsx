import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

const EditItem = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await api.get(`/items/${id}`);
        setName(data.name);
        setQuantity(data.quantity);
        setPrice(data.price);
      } catch (error) {
        console.error('Failed to fetch item', error);
      }
    };
    fetchItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/items/${id}`, { name, quantity, price });
      navigate('/');
    } catch (error) {
      console.error('Failed to update item', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Item
      </Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          label="Item Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Quantity"
          type="number"
          fullWidth
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Item
        </Button>
      </form>
    </Box>
  );
};

export default EditItem;
