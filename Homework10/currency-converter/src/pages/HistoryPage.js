// src/HistoryPage.js
import React, { useContext } from 'react';
import { HistoryContext } from '../context/HistoryContext';
import { Typography, Container, Box } from '@mui/material';

const HistoryPage = () => {
  const { history } = useContext(HistoryContext);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Conversion History</Typography>
      <Box sx={{ mt: 2 }}>
        {history.map((entry, index) => (
          <Typography key={index}>
            {entry.amount} {entry.fromCurrency} = {entry.result} {entry.toCurrency} at rate {entry.rate}
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default HistoryPage;
