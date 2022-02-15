import { useState } from 'react';
import { Paper } from '@mui/material';

import Register from '../components/register/Register';
import { SIGN_UP, SIGN_UP_FOOTER } from '../constants';
import { signup , authenticate, isAuth } from '../actions/auth';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });

  // const { name, mobile, email, password } = formData;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // setFormData({ ...formData, loading: true, error: false });
    // const user = { name, mobile, email, password };

    signup(formData).then((data) => {
      console.log(data);
      if (data.error) {
        setFormData({ ...formData});
      } else {
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/`);
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
            data={SIGN_UP}
            handleSubmit={handleSubmit}
            footData={SIGN_UP_FOOTER}
          />
        </div>
      </div>
    </Paper>
  );
};

export default Signup;
