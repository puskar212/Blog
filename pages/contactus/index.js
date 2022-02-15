import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import IconButton from '@mui/material/IconButton';

const ContactUs = () => {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box
    component="div"
    sx={{
        display: 'flex',
    }}
   
  >
      <div>
        <h3>Send your request</h3>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField id="standard-basic" label="Name" variant="standard" />
            <TextField id="standard-basic" label="Phone" variant="standard" />
          </div>
          <div>
            <TextField id="standard-basic" label="Email" variant="standard" />
            <TextField id="standard-basic" label="Company" variant="standard" />
          </div>
        </Box>
        <Box
          sx={{
            width: '52ch',
            m: 1,
            maxWidth: '100%'
          }}
        >
          <TextField
            id="standard-textarea"
            label="Comments"
            multiline
            fullWidth
            variant="standard"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Box>
      </div>
      <div>
      <h3>Contact Information</h3>
      <div>
          <span>
              Adress
          </span>
          <span>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </span>
      </div>
      <div>
          <span>
              Phone
          </span>
          <span>
              123456789
          </span>
      </div>
      <div>
          <span>
              Email
          </span>
          <span>
              X@y.com
          </span>
      </div>
      <div>
      <IconButton color="primary" aria-label="upload picture" component="span">
          <TwitterIcon />
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <FacebookIcon />
        </IconButton>
      </div>
      </div>
    </Box>
  );
};

export default ContactUs;
