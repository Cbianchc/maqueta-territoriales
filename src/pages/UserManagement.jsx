// src/pages/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  getDoc
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext1';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [workAreas, setWorkAreas] = useState([]);
  const [selectedWorkAreas, setSelectedWorkAreas] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });
  const { isSuperUser } = useAuth();

  // Redirigir si no es superuser
  if (!isSuperUser) {
    return <Typography>No tienes permiso para acceder a esta página</Typography>;
  }

  useEffect(() => {
    fetchUsers();
    fetchWorkAreas();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const usersList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const fetchWorkAreas = async () => {
    try {
      const workAreasCollection = collection(db, 'workAreas');
      const areaSnapshot = await getDocs(workAreasCollection);
      const areasList = areaSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWorkAreas(areasList);
    } catch (error) {
      console.error('Error al obtener áreas de trabajo:', error);
    }
  };

  const handleOpenDialog = () => {
    setFormData({
      email: '',
      password: '',
      role: 'user',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // Guardar información adicional en Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: formData.email,
        role: formData.role,
        createdAt: new Date()
      });
      
      handleCloseDialog();
      fetchUsers();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert(`Error al crear usuario: ${error.message}`);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        // Eliminar usuario de Firestore
        await deleteDoc(doc(db, 'users', userId));
        
        // Nota: No podemos eliminar el usuario de Firebase Auth desde el cliente
        // Esto requeriría una función en el servidor (Cloud Function)
        
        // Actualizar la lista
        fetchUsers();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert(`Error al eliminar usuario: ${error.message}`);
      }
    }
  };

  const handleEditUserRole = async (user) => {
    setSelectedUser(user);
    setFormData({
      ...formData,
      role: user.role || 'user'
    });
    
    // Obtener áreas de trabajo asignadas al usuario
    const userAreas = [];
    for (const area of workAreas) {
      if (area.userAccess && area.userAccess.includes(user.id)) {
        userAreas.push(area.id);
      }
    }
    setSelectedWorkAreas(userAreas);
    
    setOpenRoleDialog(true);
  };

  const handleCloseRoleDialog = () => {
    setOpenRoleDialog(false);
    setSelectedUser(null);
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value
    });
  };

  const handleWorkAreaChange = (e) => {
    setSelectedWorkAreas(e.target.value);
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    
    try {
      // Actualizar rol en Firestore
      await updateDoc(doc(db, 'users', selectedUser.id), {
        role: formData.role
      });
      
      // Actualizar áreas de trabajo para este usuario
      for (const area of workAreas) {
        const areaRef = doc(db, 'workAreas', area.id);
        const areaDoc = await getDoc(areaRef);
        
        if (areaDoc.exists()) {
          const areaData = areaDoc.data();
          let userAccess = areaData.userAccess || [];
          
          if (selectedWorkAreas.includes(area.id)) {
            // Agregar usuario si no está
            if (!userAccess.includes(selectedUser.id)) {
              userAccess.push(selectedUser.id);
            }
          } else {
            // Quitar usuario si está
            userAccess = userAccess.filter(id => id !== selectedUser.id);
          }
          
          await updateDoc(areaRef, { userAccess });
        }
      }
      
      handleCloseRoleDialog();
      fetchUsers();
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      alert(`Error al actualizar rol: ${error.message}`);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Gestión de Usuarios
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Nuevo Usuario
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Fecha de creación</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.role === 'superuser' ? 'Super Usuario' : 'Usuario'}
                    color={user.role === 'superuser' ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  {user.createdAt ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    color="primary"
                    onClick={() => handleEditUserRole(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay usuarios registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog para crear usuario */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Crear Nuevo Usuario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Correo Electrónico"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Rol</InputLabel>
            <Select
              name="role"
              value={formData.role}
              label="Rol"
              onChange={handleInputChange}
            >
              <MenuItem value="user">Usuario</MenuItem>
              <MenuItem value="superuser">Super Usuario</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit}>Crear</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para editar rol */}
      <Dialog open={openRoleDialog} onClose={handleCloseRoleDialog}>
        <DialogTitle>Editar Rol y Permisos</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Rol</InputLabel>
            <Select
              value={formData.role}
              label="Rol"
              onChange={handleRoleChange}
            >
              <MenuItem value="user">Usuario</MenuItem>
              <MenuItem value="superuser">Super Usuario</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Áreas de Trabajo</InputLabel>
            <Select
              multiple
              value={selectedWorkAreas}
              label="Áreas de Trabajo"
              onChange={handleWorkAreaChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const area = workAreas.find(a => a.id === value);
                    return (
                      <Chip key={value} label={area ? area.name : value} />
                    );
                  })}
                </Box>
              )}
            >
              {workAreas.map((area) => (
                <MenuItem key={area.id} value={area.id}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRoleDialog}>Cancelar</Button>
          <Button onClick={handleUpdateRole}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;