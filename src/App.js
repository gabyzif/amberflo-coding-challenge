import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainLayout from './components/MainLayout'; // Import MainLayout
import { lightTheme, darkTheme } from './theme';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  const [themeMode, setThemeMode] = useState('light');
  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };
  return (
    <Router>
      <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <MainLayout toggleTheme={toggleTheme}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Uncomment and add other routes here */}
            {/* <Route path="/create-meter" element={<CreateMeterPage />} />
          <Route path="/meters/:id" element={<MeterDetailsPage />} /> */}
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
