import React, { useState } from "react";
import { updateDoc, doc, collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

import { Modal, Box, Typography, TextField, Button, Accordion, AccordionSummary, AccordionDetails, IconButton, List, ListItem, ListItemText, TextField as MuiTextField } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

export default function RolesModal({ open, handleClose, areas, updateAreas }) {
  const [newArea, setNewArea] = useState("");
  const [newRole, setNewRole] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);

  const handleAddArea = async () => {
    if (!newArea) return alert("El nombre del área es obligatorio");
    const newAreaObject = { nombre: newArea, roles: [] };

    // Actualiza Firestore con la nueva área
    const areasRef = collection(db, "areas");
    await addDoc(areasRef, newAreaObject);

    updateAreas([...areas, newAreaObject]); // Actualiza el estado local

    setNewArea(""); // Limpia el campo
  };

  const handleAddRole = async (areaIndex) => {
    if (!newRole) return alert("El nombre del rol es obligatorio");

    const updatedAreas = [...areas];
    updatedAreas[areaIndex].roles.push(newRole);

    // Actualiza el área específica en Firestore
    const areaRef = doc(db, "areas", areas[areaIndex].id); // Necesitarías el ID de la área para actualizarla
    await updateDoc(areaRef, { roles: updatedAreas[areaIndex].roles });

    updateAreas(updatedAreas); // Actualiza el estado local
    setNewRole(""); // Limpia el campo
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 600, bgcolor: "background.paper", boxShadow: 24, p: 4
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Lista de Roles y Áreas para editar</Typography>
        
        {/* Crear nueva área */}
        <Box sx={{ mb: 2 }}>
          <MuiTextField
            fullWidth
            label="Nueva Área"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddArea} sx={{ mt: 1 }}>
            Agregar Área
          </Button>
        </Box>

        {/* Mostrar áreas con roles */}
        {areas.map((area, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="h6" sx={{ flexGrow: 1 }}>{area.nombre}</Typography>
              <IconButton color="secondary" onClick={() => handleDeleteArea(area.nombre)}>
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" sx={{ ml: 1 }} onClick={() => setSelectedArea(area.nombre)}>
                <EditIcon />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              {/* Roles de cada área */}
              <List>
                {area.roles.map((role, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={role} />
                    <IconButton color="secondary" onClick={() => handleDeleteRole(area.nombre, role)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              {/* Agregar nuevo rol */}
              {selectedArea === area.nombre && (
                <Box sx={{ mt: 2 }}>
                  <MuiTextField
                    fullWidth
                    label="Nuevo Rol"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" color="primary" onClick={() => handleAddRole(area.nombre)}>
                    Agregar Rol
                  </Button>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}

        <Button variant="outlined" onClick={handleClose} sx={{ mt: 3 }}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
}

