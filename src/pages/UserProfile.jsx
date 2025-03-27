// src/pages/UserProfile.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext1';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Avatar, 
  Grid,
  TextField,
  Button
} from '@mui/material';

const UserProfile = () => {
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Avatar 
              sx={{ width: 100, height: 100, mb: 2 }}
              alt={currentUser?.displayName || 'Usuario'}
              src={currentUser?.photoURL}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Perfil de Usuario
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              defaultValue={currentUser?.displayName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              variant="outlined"
              defaultValue={currentUser?.email || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" mt={3}>
              <Button variant="contained" color="primary">
                Actualizar Perfil
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;