// src/About.js
import React from 'react';
import { Typography, Container } from '@mui/material';

const About = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>About</Typography>
      <Typography variant="body1">
        This application allows users to convert currencies using live exchange rates. Users can view their conversion history and get accurate conversion results.
      </Typography>
    </Container>
  );
};

export default About;
