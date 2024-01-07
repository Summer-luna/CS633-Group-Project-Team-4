import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { axiosInstance } from '../../utils/axioInstance.js';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/Paths.js';
import { useAuth } from '../../context/auth.context.jsx';

export const SignIn = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const res = await axiosInstance.post('/auth/login', {
      email: data.get('email'),
      password: data.get('password')
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
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" variant="filled" />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" variant="filled" />
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              New to the ClassGuardian?
              <Link href={Paths.SIGNUP} variant="body1">
                Sign Up Here
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
