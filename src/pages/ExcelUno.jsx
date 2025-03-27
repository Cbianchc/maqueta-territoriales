import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase'; 
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Button, TextField, Paper, Typography, Box } from '@mui/material';

const ExcelUno = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ linea: '', plan: '', usuario: '', cargo: '', notas: '' });
  const [editing, setEditing] = useState(null); // Para saber qué proyecto estamos editando
  const [showForm, setShowForm] = useState(false); 
  // Traer todos los documentos de la colección de proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'ExcelUno'));
      setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProjects();
  }, []);

  // Manejar el cambio en los campos del nuevo proyecto
  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  // Agregar un nuevo proyecto a la base de datos
  const handleAddProject = async () => {
    if (Object.values(newProject).some(value => value === '')) return; // Asegurarse de que no haya campos vacíos
    const docRef = await addDoc(collection(db, 'ExcelUno'), newProject);
    setProjects([...projects, { id: docRef.id, ...newProject }]);
    setNewProject({ linea: '', plan: '', usuario: '', cargo: '', notas: '' }); // Limpiar los campos
  };

  // Editar un proyecto existente
  const handleEditProject = (project) => {
    setEditing(project.id); // Establecer el ID del proyecto que estamos editando
    setNewProject({ ...project }); // Llenar los campos con los datos actuales
  };

  // Guardar los cambios en un proyecto
  const handleSaveChanges = async () => {
    const docRef = doc(db, 'ExcelUno', editing);
    await updateDoc(docRef, newProject);
    setProjects(projects.map(project => (project.id === editing ? { ...project, ...newProject } : project)));
    setEditing(null); // Terminar de editar
    setNewProject({ linea: '', plan: '', usuario: '', cargo: '', notas: '' }); // Limpiar los campos
  };

  // Eliminar un proyecto
  const handleDeleteProject = async (id) => {
    await deleteDoc(doc(db, 'ExcelUno', id));
    setProjects(projects.filter(project => project.id !== id)); // Actualizar el estado local
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Alterna la visibilidad del formulario
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h5">Base de Datos de Teléfonos Móviles</Typography>
      </Paper>

     {/* Botón para mostrar u ocultar el formulario */}
     <Button
        variant="contained"
        color="primary"
        onClick={toggleForm}
        sx={{ marginBottom: 2 }}
      >
        {showForm ? 'Cerrar Formulario' : 'Nuevo Proyecto'}
      </Button>

      {/* Mostrar el formulario solo si showForm es true */}
      {showForm && (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">{editing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</Typography>
          <TextField
            label="Línea"
            name="linea"
            value={newProject.linea}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Plan"
            name="plan"
            value={newProject.plan}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Usuario"
            name="usuario"
            value={newProject.usuario}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Cargo"
            name="cargo"
            value={newProject.cargo}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Notas"
            name="notas"
            value={newProject.notas}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={editing ? handleSaveChanges : handleAddProject}
            disabled={Object.values(newProject).some(value => value === '')}
          >
            {editing ? 'Guardar Cambios' : 'Agregar Proyecto'}
          </Button>
        </Paper>
      )}


      {/* Lista de proyectos */}
      <Box>
        {projects.map(project => (
          <Paper key={project.id} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">Línea: {project.linea}</Typography>
            <Typography>Plan: {project.plan}</Typography>
            <Typography>Usuario: {project.usuario}</Typography>
            <Typography>Cargo: {project.cargo}</Typography>
            <Typography>Notas: {project.notas}</Typography>

            <Box sx={{ marginTop: 1 }}>
              <Button variant="contained" color="secondary" onClick={() => handleEditProject(project)}>
                Editar
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDeleteProject(project.id)} sx={{ marginLeft: 1 }}>
                Eliminar
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ExcelUno;


