import {  Button, Paper } from '@mui/material';

// import TemporaryDrawer from 'pages/theme/components/TemporaryDrawer';

const NavIndex = () => {
  return (
    <Paper
      elevation={24}
      sx={{
        width: '100vw',
        height: '100vh'
      }}
    >
      {/* <TemporaryDrawer/> */}
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Paper>
  );
};

export default NavIndex;
