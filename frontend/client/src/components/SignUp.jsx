import { useContext, useEffect, useState } from 'react';
import {
  Alert,
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
  MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';

const initialFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user',
};

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!successMessage) return undefined;

    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

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
      const response = await register(formData);
      console.log('Register response:', response?.data || response);
      setSuccessMessage('Account created successfully!');
      setFormData(initialFormState);
    } catch (error) {
        if (error.response?.status === 409) {
      setSuccessMessage('This user already exists. Please sign in or try another email.');
    } else {
      setSuccessMessage('Registration failed. Please try again.');
    }
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

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />

              <TextField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                fullWidth
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>

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

            <TextField
              label="Confirm password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, borderRadius: 2 }}>
              Create Account
            </Button>
          </Box>

          <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?
            </Typography>
            <MuiLink
              component={Link}
              to="/login"
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

export default SignUp;
