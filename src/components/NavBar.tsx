import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Link,
  useTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon for dark mode
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon for light mode

interface NavBarProps {
  toggleTheme: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/" color="inherit" underline="none">
              All Meters
            </Link>
          </Typography>
          <div>
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
