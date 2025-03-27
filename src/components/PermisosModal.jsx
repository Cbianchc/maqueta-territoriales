import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, FormGroup, FormControlLabel, Checkbox, Button, Collapse } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function PermisosModal({ open, handleClose, userId, userPermisos, setUserPermisos, areas }) {
  const [expanded, setExpanded] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    // Cuando se abre el modal, cargar los permisos del usuario desde Firebase
    const cargarPermisosUsuario = async () => {
      if (userId) {
        try {
          const userRef = doc(db, "users", userId);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const permisos = userData.permisos || [];

            // Inicializar el estado checkedItems con los permisos cargados
            const permisosCargados = {};

            permisos.forEach((area) => {
              area.subPaginas.forEach((subPagina) => {
                subPagina.filas.forEach((fila) => {
                  const uniqueId = `${area.areaId}-${subPagina.subPaginaId}-${fila}`;
                  permisosCargados[uniqueId] = true; // Marcar como seleccionado
                });
              });
            });

            setCheckedItems(permisosCargados); // Actualizar los checkboxes
          }
        } catch (error) {
          console.error("Error al cargar los permisos:", error);
        }
      }
    };

    if (open) {
      cargarPermisosUsuario(); // Cargar permisos solo cuando el modal está abierto
    }
  }, [open, userId]);

  const handleToggle = (areaId) => {
    setExpanded((prev) => ({
      ...prev,
      [areaId]: !prev[areaId],
    }));
  };

  const handleCheckboxChange = (uniqueId) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [uniqueId]: !prev[uniqueId] };
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      if (!userId) {
        throw new Error("El userId es inválido.");
      }

      // Estructurar los permisos como un objeto con áreas, subcategorías y filas seleccionadas
      const permisosEstructurados = areas.map((area) => {
        // Filtrar solo las subpáginas seleccionadas
        const subPaginasSeleccionadas = area.subPaginas
          .map((subPagina) => {
            // Filtrar las filas seleccionadas dentro de cada subpágina
            const filasSeleccionadas = subPagina.filas.filter((fila, index) => {
              const uniqueId = `${area.id}-${subPagina.id}-${index}`;
              return checkedItems[uniqueId]; // Filtrar solo las filas que están seleccionadas
            });

            // Solo devolver la subpágina si tiene filas seleccionadas
            return filasSeleccionadas.length > 0 ? {
              subPaginaId: subPagina.id,
              subPaginaNombre: subPagina.nombre,
              filas: filasSeleccionadas,
            } : null;
          })
          .filter(Boolean); // Filtrar las subpáginas que no tienen filas seleccionadas

        // Solo devolver el área si tiene subpáginas seleccionadas
        return subPaginasSeleccionadas.length > 0 ? {
          areaId: area.id,
          areaNombre: area.nombre,
          subPaginas: subPaginasSeleccionadas,
        } : null;
      }).filter(Boolean); // Filtrar las áreas que no tienen subpáginas seleccionadas

      // Actualizar el estado en el padre
      setUserPermisos(permisosEstructurados);

      // Guardar en Firestore solo lo que tiene permisos seleccionados
      if (permisosEstructurados.length > 0) {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { permisos: permisosEstructurados });
        console.log("Permisos actualizados en Firebase:", permisosEstructurados);
      } else {
        console.log("No se seleccionaron permisos para guardar.");
      }

      handleClose(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al actualizar permisos:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Editar Permisos
        </Typography>

        <FormGroup>
          {areas.map((area) => (
            <div key={area.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!checkedItems[area.id]}
                    onChange={() => handleCheckboxChange(area.id)}
                  />
                }
                label={area.nombre}
              />
              <Button onClick={() => handleToggle(area.id)} size="small">
                {expanded[area.id] ? "Ocultar" : "Mostrar"}
              </Button>

              <Collapse in={expanded[area.id]} timeout="auto" unmountOnExit>
                <div style={{ marginLeft: "20px" }}>
                  {area.subPaginas.map((subPagina) => (
                    <div key={subPagina.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!checkedItems[subPagina.id]}
                            onChange={() => handleCheckboxChange(subPagina.id)}
                          />
                        }
                        label={subPagina.nombre}
                      />
                      <Collapse in={true} timeout="auto" unmountOnExit>
                        <div style={{ marginLeft: "20px" }}>
                          {subPagina.filas.map((fila, index) => {
                            const uniqueId = `${area.id}-${subPagina.id}-${index}`;
                            return (
                              <FormControlLabel
                                key={uniqueId}
                                control={
                                  <Checkbox
                                    checked={!!checkedItems[uniqueId]}
                                    onChange={() => handleCheckboxChange(uniqueId)}
                                  />
                                }
                                label={fila}
                              />
                            );
                          })}
                        </div>
                      </Collapse>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          ))}
        </FormGroup>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

