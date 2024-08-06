import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, List, ListItem, ListItemText, CircularProgress, Grid, Alert } from '@mui/material';
import api from '../../api';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await api.get('/items/in-storage');
        setItems(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch items');
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <CircularProgress />;

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Items in Storage
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/add" sx={{ mb: 2 }}>
        Add Item
      </Button>
      <List>
        {items.map((item) => (
          <ListItem key={item._id} button component={Link} to={`/edit/${item._id}`} sx={{ borderBottom: '1px solid #ccc' }}>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ItemList;
