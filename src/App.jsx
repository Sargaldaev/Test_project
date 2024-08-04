import  {useEffect, useState} from 'react';
import DataTable from './features/TableData/TableData.jsx';
import {Box, Button, createTheme, CssBaseline, ThemeProvider} from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const App = () => {

  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme.palette.mode === 'light' ? darkTheme : lightTheme;
      localStorage.setItem('themeMode', newTheme.palette.mode);
      return newTheme;
    });
  };

  useEffect(() => {
    const savedThemeMode = localStorage.getItem('themeMode');
    if (savedThemeMode === 'dark') {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{p: 2}}>
        <Button onClick={toggleTheme} variant="contained" color="primary">
          Switch theme
        </Button>
        <DataTable/>
      </Box>
    </ThemeProvider>
  );
};

export default App;