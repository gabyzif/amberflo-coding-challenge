// Footer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ textAlign: 'center', py: 3 }}>
      <Typography variant="subtitle1">© 2024 My App</Typography>
    </Box>
  );
};

export default Footer;
