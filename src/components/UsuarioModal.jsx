import React from "react";
import { Modal, Box, Typography, TextField, MenuItem, Button } from "@mui/material";

export default function UsuarioModal({ open, handleClose, newUser, handleChange, areas, roles, editMode, handleSave }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{editMode ? "Editar Usuario" : "Nuevo Usuario"}</Typography>
        <TextField fullWidth label="Nombre" name="nombre" value={newUser.nombre} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Apellido" name="apellido" value={newUser.apellido} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Email" name="email" value={newUser.email} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleChange} // Usa el mismo handle para manejar los cambios
          fullWidth
          margin="normal"
        />

        <TextField fullWidth label="Teléfono" name="telefono" value={newUser.telefono} onChange={handleChange} sx={{ mb: 2 }} />
        {/* <TextField select fullWidth label="Área" name="area" value={newUser.area} onChange={handleChange} sx={{ mb: 2 }}>
          {areas.map((area, index) => <MenuItem key={index} value={area.nombre}>{area.nombre}</MenuItem>)}
        </TextField>
        <TextField select fullWidth label="Rol" name="rol" value={newUser.rol} onChange={handleChange} sx={{ mb: 2 }}>
          {roles.map((rol, index) => <MenuItem key={index} value={rol}>{rol}</MenuItem>)}
        </TextField> */}
        <Button variant="contained" color="primary" onClick={handleSave}>
          {editMode ? "Actualizar" : "Guardar"}
        </Button>
        <Button variant="outlined" onClick={handleClose}>Cerrar</Button>

      </Box>
    </Modal>
  );
}
