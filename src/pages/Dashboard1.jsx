// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Button
} from '@mui/material';
import {
  TableChart as TableChartIcon,
  People as PeopleIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext1';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [workAreas, setWorkAreas] = useState([]);
  const [users, setUsers] = useState([]);
  const { currentUser, isSuperUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener áreas de trabajo disponibles para el usuario
        let areasQuery;
        
        if (isSuperUser) {
          // Super user ve todas las áreas
          areasQuery = collection(db, 'workAreas');
        } else {
          // Usuario normal solo ve áreas asignadas
          areasQuery = query(
            collection(db, 'workAreas'),
            where('userAccess', 'array-contains', currentUser.uid)
          );
        }
        
        const areasSnapshot = await getDocs(areasQuery);
        
        const areas = [];
        areasSnapshot.forEach((doc) => {
          areas.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setWorkAreas(areas);
        
        // Si es superuser, obtener también la lista de usuarios
        if (isSuperUser) {
          const usersCollection = collection(db, 'users');
          const usersSnapshot = await getDocs(usersCollection);
          const usersList = [];
          usersSnapshot.forEach((doc) => {
            usersList.push({
              id: doc.id,
              ...doc.data()
            });
          });
          setUsers(usersList);
        }
      } catch (error) {
        console.error('Error al obtener datos para el dashboard:', error);
      }
    };

    fetchData();
  }, [currentUser, isSuperUser]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="body1" paragraph>
        Bienvenido, {currentUser?.email}. {isSuperUser && 'Tienes acceso de Super Usuario.'}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Tarjeta de áreas de trabajo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Áreas de Trabajo" 
              action={
                isSuperUser && (
                  <Button 
                    size="small" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/dashboard/work-areas')}
                  >
                    Gestionar
                  </Button>
                )
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Tienes acceso a {workAreas.length} áreas de trabajo.
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                {workAreas.slice(0, 5).map((area) => (
                  <Paper 
                    key={area.id}
                    sx={{ 
                      p: 2, 
                      mb: 1, 
                      display: 'flex', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover'
                      }
                    }}
                    onClick={() => navigate(`/dashboard/work-area/${area.id}`)}
                  >
                    <TableChartIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle1">{area.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {area.description || 'Sin descripción'}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
                
                {workAreas.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No tienes acceso a ningún área de trabajo.
                  </Typography>
                )}
                
                {workAreas.length > 5 && (
                  <Button 
                    size="small" 
                    sx={{ mt: 1 }}
                    onClick={() => navigate('/dashboard/work-areas')}
                  >
                    Ver todas ({workAreas.length})
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Tarjeta de usuarios (solo para superuser) */}
        {isSuperUser && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader 
                title="Usuarios" 
                action={
                  <Button 
                    size="small" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/dashboard/users')}
                  >
                    Gestionar
                  </Button>
                }
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Sistema con {users.length} usuarios registrados.
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  {users.slice(0, 5).map((user) => (
                    <Paper 
                      key={user.id}
                      sx={{ 
                        p: 2, 
                        mb: 1, 
                        display: 'flex', 
                        alignItems: 'center' 
                      }}
                    >
                      <PeopleIcon sx={{ mr: 2, color: user.role === 'superuser' ? 'error.main' : 'info.main' }} />
                      <Box>
                        <Typography variant="subtitle1">{user.email}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.role === 'superuser' ? 'Super Usuario' : 'Usuario Regular'}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                  
                  {users.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      No hay usuarios registrados.
                    </Typography>
                  )}
                  
                  {users.length > 5 && (
                    <Button 
                      size="small" 
                      sx={{ mt: 1 }}
                      onClick={() => navigate('/dashboard/users')}
                    >
                      Ver todos ({users.length})
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;