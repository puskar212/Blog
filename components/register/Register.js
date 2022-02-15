import { useEffect } from 'react';
import Router from 'next/router';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { isAuth } from '../../actions/auth';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Register = ({ formData, setFormData, data, handleSubmit, footData }) => {
  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, error: false, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          // marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" key={footData.heading}>
          {footData.heading}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {data.map(({ name, label, type, autoComplete }, i) => (
            <TextField
              key={name}
              type={type}
              margin="normal"
              required
              fullWidth
              id={name}
              label={label}
              name={name}
              autoComplete={autoComplete}
              autoFocus={i === 0}
              value={formData[name]}
              onChange={handleChange}
            />
          ))}
          <FormControlLabel
            control={<Checkbox value={footData.value} color="primary" />}
            label={footData.label}
            key={footData.label}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
           {footData.heading}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {footData.forgotPassword}
              </Link>
            </Grid>
            <Grid item>
              <Link href={footData.route} variant="body2">
                {footData.account}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Register;
