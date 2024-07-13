// src/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Select, MenuItem, Container, Box, CircularProgress } from '@mui/material';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [currencies, setCurrencies] = useState({});
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch list of currencies
  useEffect(() => {
    axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then(response => {
        setCurrencies(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching currency list:', error);
        setLoading(false);
      });
  }, []);

  // Handle conversion
  const handleConvert = () => {
    if (fromCurrency && toCurrency && amount) {
      axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.min.json`)
        .then(response => {
          console.log('API response:', response.data);
          const rate = response.data[fromCurrency][toCurrency]
          console.log('Fetched exchange rate:', rate);//undefined
          if (rate !== undefined && !isNaN(rate)) {
            setExchangeRate(rate);
            setConvertedAmount((amount * rate).toFixed(6));
          } else {
            setExchangeRate('');
            setConvertedAmount('Error: Invalid Conversion');
          }
        })
        .catch(error => {
          console.error('Error fetching exchange rate:', error);
          setExchangeRate('');
          setConvertedAmount('Error fetching exchange rate');
        });
    } else {
      setConvertedAmount('Please enter an amount and select currencies.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Currency Converter</Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>Select To Currency</MenuItem>
              {Object.keys(currencies).map(key => (
                currencies[key] ? <MenuItem key={key} value={key}>{currencies[key]}</MenuItem> : null
              ))}
            </Select>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>Select To Currency</MenuItem>
              {Object.keys(currencies).map(key => (
                currencies[key] ? <MenuItem key={key} value={key}>{currencies[key]}</MenuItem> : null
              ))}
            </Select>
          </Box>
        </>
      )}
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="success" onClick={handleConvert} fullWidth>
          CONVERT
        </Button>
      </Box>
      {convertedAmount && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">
            {amount} {currencies[fromCurrency]} = {convertedAmount} {currencies[toCurrency]}
          </Typography>
          {exchangeRate !== '' && (
            <Typography variant="subtitle1">
              1 {currencies[fromCurrency]} = {exchangeRate} {currencies[toCurrency]}
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default CurrencyConverter;