import * as React from 'react';
import { Avatar, Box, Button, Grid, Link, Typography, Popover, ListItem, List, ListItemButton, ListItemText } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Paths } from '../../../constants/Paths.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth.context.jsx';

export const Navbar = () => {
  const [avatarDrop, setAvatarDrop] = React.useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleAvatarClick = (e) => {
    setAvatarDrop(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarDrop(null);
  };

  const handleLogOut = () => {
    navigate(Paths.LOGOUT);
    window.location.reload(false);
  };

  //When user's token exits, display avatar icon
  const avatarDisplay = () => {
    if (token != null) {
      return (
        <Grid item>
          <Button onClick={handleAvatarClick}>
            <Avatar>A</Avatar>
            <KeyboardArrowDownIcon />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={avatarDrop}
            onClose={handleAvatarClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogOut}>
                  <ListItemText primary="Sign Out" />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </Grid>
      );
    } else {
      return null;
    }
  };

  //When user's token not exists, display the sign in button
  const signInDisplay = () => {
    if (!token) {
      return (
        <Grid item>
          <Link href={Paths.LOGIN} variant="h5">
            Sign In
          </Link>
        </Grid>
      );
    }
  };

  const open = Boolean(avatarDrop);
  const id = open ? 'avatar-popover' : undefined;
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderBottom: '1px solid black',
        marginBottom: 6
      }}
    >
      <Grid item>
        <Box
          sx={{
            width: 250,
            height: 50,
            backgroundColor: 'primary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '6px'
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              color: 'white'
            }}
          >
            ClassGuardian
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
          <Grid item>
            <Link href={Paths.HOME} variant="h5">
              Home
            </Link>
          </Grid>
          {signInDisplay()}
          {avatarDisplay()}
        </Grid>
      </Grid>
    </Grid>
  );
};
