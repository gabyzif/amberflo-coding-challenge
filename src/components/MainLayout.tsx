// MainLayout.tsx
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Container } from '@mui/material';

interface MainLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, toggleTheme }) => {
  return (
    <>
      <NavBar toggleTheme={toggleTheme} />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default MainLayout;
