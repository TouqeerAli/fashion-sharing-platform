import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Box component={Link} to="/admin" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 800, letterSpacing: '.1rem' }}>
        Fashion<span style={{ color: '#3f51b5' }}>Fix</span>
      </Typography>
    </Box>
  );
};

export default Logo;