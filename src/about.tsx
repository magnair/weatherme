// src/About.tsx
import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          About Us
        </Typography>
        <Typography variant="body1" paragraph align="justify">
          Welcome to our application! We are dedicated to providing you with the best experience possible. Our team is committed to innovation and excellence in every project we undertake.
        </Typography>
        <Typography variant="body1" paragraph align="justify">
          Our mission is to deliver high-quality solutions that meet the needs of our users. We strive to stay at the forefront of technology, ensuring that we provide state-of-the-art features that enhance usability and functionality.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body2" align="justify">
              To be a leader in our industry, known for our innovative solutions and exceptional customer service.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Our Values
            </Typography>
            <Typography variant="body2" align="justify">
              Integrity, teamwork, and customer focus are at the core of everything we do.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Our Team
            </Typography>
            <Typography variant="body2" align="justify">
              Our team is made up of passionate individuals with diverse backgrounds and expertise, working together to achieve our goals.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About;