import { NavLink } from "react-router-dom";

import { AppBar, Box, Toolbar, Typography, Container, Button } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Navbar = () => {
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
                <NavLink to="#" style={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}>SignUp</NavLink>
              </Button>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                <NavLink to="#" style={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}>SignIn</NavLink>
              </Button>
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
