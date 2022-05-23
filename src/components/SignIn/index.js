import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../../services/authServices';
import { useState } from 'react';


const theme = createTheme();





export default function SignIn() {

  const [form, setForm] = useState({
    isSubmitted: false,
    error: ''
  });

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const isValid = () => {
    return user.email.length > 0 && user.password.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setForm({
      ...form,
      isSubmitted: true
    });

    if (!isValid()) {
      setForm({
        ...form,
        error: 'Veuillez remplir tous les champs.'
      });
      return;
    }

    try {
      const { data } = await login(user);
      window.localStorage.setItem("token", data.jwt);
      window.location = "/";
    } catch (error) {
      setForm({
        ...form,
        error: error.response.data
      });
    }


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'identifier
          </Typography>
          {
            form.error.length > 0 &&

            <Typography style={{ display: 'flex', width: '100%' }} sx={{ mt: 3, mb: 1 }} variant="body1" color="error.main" align="center">
              {form.error.charAt(0).toUpperCase() + form.error.slice(1)}
            </Typography>

          }

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              type="email"
              autoFocus
              fullWidth
              id="email"
              label="Adresse Mail"
              name="email"
              autoComplete="email"
              onChange={(e) => {
                setForm({
                  ...form,
                  error: ''
                });
                setUser({
                  ...user,
                  email: e.target.value
                })

              }}

            // required
            />
            <TextField
              margin="normal"
              // required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {

                setForm({
                  ...form,
                  error: ''
                });
                setUser({
                  ...user,
                  password: e.target.value
                })

              }}

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Souviens-toi de moi"
            />
            <Button
              type="S'authentifier"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'identifier
            </Button>
            <Grid container>

              <Grid item>
                <Link href="/registre" variant="body2">
                  {"Vous n'avez pas de compte ? S'inscrire"}
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

