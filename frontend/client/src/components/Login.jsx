import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../context/authContext';

const initialFormState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login(formData);

      if (response?.status >= 200 && response?.status < 300) {
        navigate('/course');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'linear-gradient(135deg, #eef4ff 0%, #f8f9ff 45%, #edf7f4 100%)',
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 480,
          borderRadius: 4,
          boxShadow: '0 20px 50px rgba(26, 35, 126, 0.12)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 2 }}>
              Create account
            </Typography>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, textAlign: 'center' }}>
              Register
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Create your account to start learning.
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, borderRadius: 2 }}>
              Login
            </Button>
          </Box>

          <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?
            </Typography>
            <MuiLink
              component="button"
              type="button"
              underline="hover"
              sx={{ cursor: 'pointer', fontWeight: 600 }}
            >
              Sign in
            </MuiLink>
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3 }}>
            <Divider flexItem />
            <Typography variant="caption" color="text.secondary">
              OR
            </Typography>
            <Divider flexItem />
          </Box>

          <Button variant="outlined" fullWidth size="large" sx={{ borderRadius: 2 }}>
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
