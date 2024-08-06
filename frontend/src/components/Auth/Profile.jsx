import { useContext, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import api from '../../api';

const Profile = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState(auth.user.username);
  const [email, setEmail] = useState(auth.user.email);

  const handleUpdate = async () => {
    try {
      const { data } = await api.put('/auth/user', { username, email });
      setAuth({ ...auth, user: data });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Profile
      </Typography>
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
      <Button onClick={handleUpdate} variant="contained" color="primary" fullWidth>
        Update Profile
      </Button>
    </Box>
  );
};

export default Profile;
