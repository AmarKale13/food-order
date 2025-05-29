import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Menu, MenuItem, Avatar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
  const { currentUser, signOut } = useAuth();
  const { getTotalCount }       = useCart();
  const navigate = useNavigate();

  // State for avatar menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleMenuClose();
    signOut();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
      
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/menu')}
          style={{ fontWeight: 'bold' ,fontSize: '1.7rem' }}
        >
          Immortal<span style={{ color: '#fff9c4',fontSize: '1.5rem' }}>Food</span>
        </Typography>

        {!currentUser && (
          <Box>
            <IconButton
              color="inherit"
              onClick={() => navigate('/login')}
            >
              <Typography variant="button" color="inherit">
                Login
              </Typography>
            </IconButton>
          </Box>
        )}

        {currentUser && (
          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={getTotalCount()} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        )}

        {currentUser && (
          <>
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Avatar>
                {currentUser.email.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem disabled>
                {currentUser.email}
              </MenuItem>
              <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
