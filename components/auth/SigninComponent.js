import Router from 'next/router';
import { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
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
}

const theme = createTheme();

const SigninComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { email, password, error, loading, message, showForm } = formData;

  useEffect(() => {
    console.log('.......', isAuth());
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, loading: true, error: false });
    const user = { name, email, password };

    signin(user).then((data) => {
      console.log(data);
      if (data.error) {
        setFormData({ ...formData, error: data.error, loading: false });
      } else {
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, error: false, [name]: event.target.value });
    console.log(name);
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : '';

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : '';

  return (
    <>
    </>
  );
};

export default SigninComponent;
