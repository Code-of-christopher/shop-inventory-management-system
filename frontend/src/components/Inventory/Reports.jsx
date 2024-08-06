import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import api from '../../api';

const Reports = () => {
  const [report, setReport] = useState({ totalItems: 0, totalSales: 0 });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await api.get('/reports');
        setReport(data);
      } catch (error) {
        console.error('Failed to fetch reports', error);
      }
    };
    fetchReports();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary={`Total Items in Storage: ${report.totalItems}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Total Sales: $${report.totalSales}`} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Reports;
