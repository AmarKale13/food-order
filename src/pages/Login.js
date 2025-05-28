// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Paper, Typography,
  TextField, Button, Alert, Link
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { signIn, signUp, error } = useAuth();
  const navigate = useNavigate();

  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [formError,   setFormError]   = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    try {
      if (isSigningUp) await signUp(email, password);
      else              await signIn(email, password);
      navigate('/menu');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isSigningUp ? 'Create Your Account' : 'Welcome Back'}
        </Typography>

        {(formError || error) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError || error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'grid', gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading
              ? (isSigningUp ? 'Creating…' : 'Signing In…')
              : (isSigningUp ? 'Sign Up'     : 'Sign In')}
          </Button>
        </Box>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            {isSigningUp
              ? 'Already have an account?'
              : "Don't have an account?"}{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setIsSigningUp(prev => !prev);
                setFormError('');
              }}
            >
              {isSigningUp ? 'Sign In' : 'Sign Up'}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
