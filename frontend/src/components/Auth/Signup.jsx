import { useState, useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import AuthContext from '../../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/signup', { username, email, password });
      localStorage.setItem('token', data.token);
      setAuth({ token: data.token, user: data.user });
      navigate('/');
    } catch (error) {
      console.error('Failed to signup', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Signup
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
