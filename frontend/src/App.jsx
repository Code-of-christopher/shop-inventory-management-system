import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import AuthContext from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './components/Auth/Profile';
import ItemList from './components/Inventory/ItemList';
import AddItem from './components/Inventory/AddItem';
import EditItem from './components/Inventory/EditItem';
import StockInStorage from './components/Inventory/StockInStorage';
import Sales from './components/Inventory/Sales';
import AddSale from './components/Inventory/AddSale';  // Import the AddSale component
import Reports from './components/Inventory/Reports';
import PrivateRoute from './components/Auth/PrivateRoute';

const App = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          {auth ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <Button color="inherit" component={Link} to="/storage">
                Stock In Storage
              </Button>
              <Button color="inherit" component={Link} to="/sales">
                Sales
              </Button>
              <Button color="inherit" component={Link} to="/add-sale">
                Add Sale
              </Button>
              <Button color="inherit" component={Link} to="/reports">
                Reports
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><ItemList /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><AddItem /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditItem /></PrivateRoute>} />
          <Route path="/storage" element={<PrivateRoute><StockInStorage /></PrivateRoute>} />
          <Route path="/sales" element={<PrivateRoute><Sales /></PrivateRoute>} />
          <Route path="/add-sale" element={<PrivateRoute><AddSale /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
