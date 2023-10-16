import { Box, Button, Container, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material';
import * as React from 'react';

export const SignUp = () => {
  const [role, setRole] = React.useState('student');
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
      buid: data.get('buid'),
      role: role
    });
    //console.log(event.currentTarget);
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
              <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus variant="filled" />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" variant="filled" />
            </Grid>

            <Grid item xs={12}>
              <TextField helperText="Please Include the first letter." required fullWidth id="buid" label="BU ID" name="buid" autoComplete="bu-id" variant="filled" />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" variant="filled" />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" variant="filled" />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select labelId="role-select-label" id="role-selection" value={role} label="Role" onChange={handleChange}>
                  <MenuItem value={'student'}>Student</MenuItem>
                  <MenuItem value={'professor'}>Professor</MenuItem>
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
