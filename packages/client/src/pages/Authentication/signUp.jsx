import { Box, Button, Container, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { axiosInstance } from '../../utils/axioInstance.js';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/Paths.js';
import { useAuth } from '../../context/auth.context.jsx';

export const SignUp = () => {
  const [role, setRole] = React.useState('student');
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const res = await axiosInstance.post('/auth/signup', {
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      buID: data.get('buid'),
      role: role
    });

    if (res.data) {
      setToken(res.data.accessToken);
      navigate(Paths.HOME);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h4">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
            </Grid>

            <Grid item xs={12}>
              <TextField helperText="Please Include the first letter." required fullWidth id="buid" label="BU ID" name="buid" autoComplete="bu-id" />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select labelId="role-select-label" id="role-selection" value={role} label="Role" onChange={handleChange}>
                  <MenuItem value={1}>Student</MenuItem>
                  <MenuItem value={0}>Professor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              You have an account?
              <Link href="/signin" variant="body1">
                Sign In Here
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
