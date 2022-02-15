import React, { useState, useEffect, useRef } from 'react';
import { useS3Upload } from 'next-s3-upload';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Image from 'material-ui-image';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import {
  IconButton,
  ImageList,
  ImageListItem,
  Box,
  CardMedia,
  CardHeader,
  Card,
  Divider,
  Typography
} from '@mui/material';
import {
  CustomButtonRoot,
  ImageContainer,
  DeleteIconButton,
  VisibilityIconButton
} from './styles';

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

export default function UploadTest() {
  const [imagedata, setImagedata] = useState([]);
  const [veiw, setVeiw] = useState(false);
  const [veiwdata, setVeiwdata] = useState([]);
  const [open, setOpen] = useState(false);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async (file) => {
    setLoading(true);

    let { url } = await uploadToS3(file);
    setImagedata([...imagedata, url]);
    setLoading(false);
  };

  const handleDelete = (index) => {
    const abc = [...imagedata];
    abc.splice(index, 1);
    setImagedata([...abc]);
  };

  const handleVeiw = (imageurl, index) => {
    setVeiw(true);
    setVeiwdata([...veiwdata, imageurl]);
    setOpen(!open);
  };

  const closeVeiw = () => {
    setVeiw(false);
    setVeiwdata([]);
  };

  const handleClose = () => {
    setOpen(false);
    setVeiw(false);
    setVeiwdata([]);
  };

  console.log(loading);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {veiw && (
          <Card sx={{ maxWidth: 520, width: '100%' }}>
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={closeVeiw}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <Divider />

            <CardMedia
              sx={{ p: 3 }}
              component="img"
              height="auto"
              width="auto"
              image={veiwdata[0]}
              alt="Paella dish"
            />
          </Card>
        )}
      </Backdrop>

      <FileInput onChange={handleFileChange} />

      {/* {veiw && (
        <div>
          <img src={veiwdata[0]} />
          <button onClick={closeVeiw} >X</button>
        </div>
      )} */}

      <ImageList sx={{ width: 380 ,}} cols={3} rowHeight={104}>
        {imagedata.map((item, i) => (
          <Box component='div'
          sx={{ padding : 1 , border : '1px solid #d9d9d9' , borderRadius: 1}}>
            <ImageContainer
              src={`${item}?w=104&h=104&fit=crop&auto=format`}
              srcSet={`${item}?w=104&h=104&fit=crop&auto=format&dpr=2 2x`}
            >
              <VisibilityIconButton aria-label="delete" component="span">
                <VisibilityIcon onClick={() => handleVeiw(item, i)} sx={{ fontSize: 20 }}/>
              </VisibilityIconButton>
              <DeleteIconButton aria-label="delete" component="span">
                <DeleteIcon onClick={() => handleDelete(i)} sx={{ fontSize: 20 }}/>
              </DeleteIconButton>
            </ImageContainer>
          </Box>
        ))}
        {loading && (
          <Box
          component='div'
            sx={{ paddingTop : 5, paddingLeft : 2 , paddingRight : 2,  width: '100%' , color : 'blue' }}
          >
            <Typography variant="body2"  sx={{ textAlign : 'center',color:"black"}}>Uploading...</Typography>
            <LinearProgress />
          </Box>
        )}
        <CustomButton onClick={openFileDialog}>+ Upload</CustomButton>
      </ImageList>
    </>
  );
}
