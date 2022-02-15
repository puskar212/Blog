import { useState } from 'react';
import Router from 'next/router';

import { Paper } from '@mui/material';

import Register from '../components/register/Register';
import { SIGN_IN, SIGN_IN_FOOTER } from '../constants';
import { signin, authenticate, isAuth } from '../actions/auth';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    signin(formData).then((data) => {
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

  return (
    <Paper
      elevation={24}
      sx={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <div>
        <div>
          <Register
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            data={SIGN_IN}
            handleSubmit={handleSubmit}
            footData={SIGN_IN_FOOTER}
          />
        </div>
      </div>
    </Paper>
  );
};

export default Signin;
