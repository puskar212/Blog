import React from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';

const MyTheme = ({ children }) => {
  const { mode } = useSelector((state) => state.settings);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            ...amber,
            ...(mode === 'dark' && {
              main: amber[300]
            })
          },
          ...(mode === 'dark'),
          text: {
            ...(mode === 'light'
              ? {
                  primary: grey[900],
                  secondary: grey[800]
                }
              : {
                  primary: '#fff',
                  secondary: grey[500]
                })
          }
        }
      }),
    [mode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MyTheme;
