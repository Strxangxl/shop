import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Box, Toolbar, Typography, Container, Button, MenuItem, Menu } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { logout } from "../actions/userActions";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <nav>
    <AppBar position="static">
      <Container>
        <Toolbar>
          <StarBorderIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Shop
          </Typography>

          <StarBorderIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Shop
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                <NavLink to={"/register"} style={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}>SignUp</NavLink>
              </Button>
              {userInfo ? (
                <div>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleMenu}>{userInfo.name}</Button>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <NavLink to={"/profile"}>Profile</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="#" onClick={logoutHandler}>Logout</NavLink>
                </MenuItem>
              </Menu>
              </div>
              ) : 
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  <NavLink to={'/login'} style={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}>SignIn</NavLink>
                </Button>
              }
              <Button>
                <NavLink to="/cart" style={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}>
                  <ShoppingCartOutlinedIcon />
                </NavLink>
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </nav>
  );
};

export default Navbar;
