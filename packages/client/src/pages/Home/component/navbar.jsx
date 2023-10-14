import * as React from 'react';
import { Avatar, Box, Button, Grid, Link, Typography, Popover, ListItem, List, ListItemButton, ListItemText } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Navbar = () => {
  const [avatarDrop, setAvatarDrop] = React.useState(null);
  const handleAvatarClick = (e) => {
    setAvatarDrop(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarDrop(null);
  };

  const handleLogOut = () => {
    console.log('Log out');
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
            <Link href={'/'}>Home</Link>
          </Grid>
          <Grid item>
            <Link href={'/signin'}>Sign In</Link>
          </Grid>
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
        </Grid>
      </Grid>
    </Grid>
  );
};
