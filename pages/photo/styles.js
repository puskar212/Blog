import styled from 'styled-components';
import { IconButton, ImageListItem } from '@mui/material';
import Image from 'material-ui-image';

export const DeleteIconButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.5s;
  color: white;
`;

export const VisibilityIconButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.5s;
  color: white;
`;

export const ImageContainer = styled(ImageListItem)`
  background: url(${(props) => props.src});

  
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: 104px 104px;
  position: relative;
 
  &:hover {
    ${DeleteIconButton} {
      opacity: 1;
      transition: all 0.5s;
    }
    &:hover {
      ${VisibilityIconButton} {
        opacity: 1;
        transition: all 0.5s;
      }

    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${(props) => props.src});
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: 104px 104px;
  }
`;

export const CustomButtonRoot = styled.button`
  width: 122px;
  height: 122px;
  border: 1px dashed lightgrey;
  background-color: transparent;
  border-radius: 4px;

  &:hover {
    border: 1px dashed blue;
    background-color: transparent;
  }
`;
