import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

import { isAuth, signout } from '../../../actions/auth';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { handleMode } from '../../../store/settings';
import { PAGES } from '../../../constants';
import { Search, SearchIconWrapper, StyledInputBase } from '../styles';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const TemporaryDrawer = () => {
  const { mode } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  // const colorMode = React.useContext(ColorModeContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setOpen(true);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setOpen(false);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const handleTheme = () => {
  //   setToggleThemeButton(!toggleThemeButton);
  //   if (toggleThemeMode === "light") {
  //     setToggleThemeMode("dark");
  //     console.log("if");
  //   } else {
  //     setToggleThemeMode("light");
  //     console.log("else");
  //   }
  // };

  // const handleThemeDark = () => {
  //   setToggleThemeButton(!toggleThemeButton)
  //     }
  console.log(Boolean(anchorElNav));

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link href="/">LOGO</Link>
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            role="presentation"
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <Drawer
                anchor="left"
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {PAGES.map((e) => (
                  <MenuItem key={e.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{e.name}</Typography>
                  </MenuItem>
                ))}
              </Drawer>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {PAGES.map(
              (e) =>
                ((e.name === 'Admin' && isAuth() && isAuth().role === 1) ||
                  e.name !== 'Admin') && (
                  <Button
                    key={e.name}
                    onClick={() => Router.push(e.route)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {e.name}
                  </Button>
                )
            )}
          </Box>

          {isAuth() && (
            <Button
              onClick={() => signout(() => Router.push(`/signin`))}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Signout
            </Button>
          )}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* {toggleThemeButton && (
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleTheme()}
            >
              <LightModeOutlinedIcon fontSize="inherit" />
            </IconButton>
          )}

          {!toggleThemeButton && (
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleTheme()}
            >
              <DarkModeOutlinedIcon fontSize="inherit" />
            </IconButton>
          )} */}

          <Box>
            {theme.palette.mode} mode
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => dispatch(handleMode())}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TemporaryDrawer;
