import Link from 'next/link';
import {  Stack ,Button, Paper } from '@mui/material';


const Index = () => {
  return (
    <Paper
    elevation={24}
    sx={{
      width: '100vw',
      height: '100vh'
    }}
  >
        <h2>index page</h2>
      <Stack spacing={2} direction="row">
        <Link href="/signin">
          <Button variant="contained">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button variant="outlined">Sign Up</Button>
        </Link>
        <div className="google-map-code">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d844.7353685911011!2d88.3530770273737!3d22.55059953477288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771aa44ec4d9%3A0xd83d18fcde71360!2s24%2C%20Park%20St%2C%20near%20Barbeque%20Nation%2C%20Park%20Street%20area%2C%20Kolkata%2C%20West%20Bengal%20700016!5e0!3m2!1sen!2sin!4v1643194299339!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
        </div>
      </Stack>
      </Paper>
  );
};

export default Index;
