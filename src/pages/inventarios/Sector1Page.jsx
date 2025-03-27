import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const fakeInventarios = [
  { id: 1, nombre: "Inventario Enero", fecha: "2024-01-01" },
  { id: 2, nombre: "Inventario Febrero", fecha: "2024-02-01" },
  { id: 3, nombre: "Inventario Marzo", fecha: "2024-03-01" },
  { id: 4, nombre: "Inventario Abril", fecha: "2024-04-01" },
  { id: 5, nombre: "Inventario Mayo", fecha: "2024-05-01" },
];

const Sector1Page = () => {
  const [busqueda, setBusqueda] = useState("");
  const [inventarios, setInventarios] = useState(fakeInventarios);
  const [open, setOpen] = useState(false);
  const [datosInventario, setDatosInventario] = useState({
    lugar: "",
    coordinador: "",
    telefono: "",
    direccion: "",
    items: [],
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setDatosInventario({ ...datosInventario, [e.target.name]: e.target.value });
  };

  const agregarFila = () => {
    setDatosInventario({
      ...datosInventario,
      items: [...datosInventario.items, { seria: "", inventario: "", campo: "" }],
    });
  };

  const handleItemChange = (index, e) => {
    const nuevosItems = [...datosInventario.items];
    nuevosItems[index][e.target.name] = e.target.value;
    setDatosInventario({ ...datosInventario, items: nuevosItems });
  };

  const agregarInventario = () => {
    setInventarios([...inventarios, { id: inventarios.length + 1, nombre: `Nuevo Inventario`, fecha: new Date().toISOString().split("T")[0] }]);
    handleClose();
  };

  return (
    <div>
      <TextField label="Buscar Inventario" variant="outlined" fullWidth onChange={(e) => setBusqueda(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginTop: 10 }}>Crear Nuevo</Button>
      
      <ul>
        {inventarios.filter(i => i.nombre.toLowerCase().includes(busqueda.toLowerCase())).map((inv) => (
          <li key={inv.id}>{inv.nombre} - {inv.fecha}</li>
        ))}
      </ul>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Crear Nuevo Inventario</DialogTitle>
        <DialogContent>
          <TextField label="Lugar" name="lugar" fullWidth onChange={handleChange} />
          <TextField label="Coordinador" name="coordinador" fullWidth onChange={handleChange} style={{ marginTop: 10 }} />
          <TextField label="Teléfono" name="telefono" fullWidth onChange={handleChange} style={{ marginTop: 10 }} />
          <TextField label="Dirección" name="direccion" fullWidth onChange={handleChange} style={{ marginTop: 10 }} />
          
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sería</TableCell>
                <TableCell>N° de Inventario</TableCell>
                <TableCell>Campo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosInventario.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField name="seria" value={item.seria} onChange={(e) => handleItemChange(index, e)} />
                  </TableCell>
                  <TableCell>
                    <TextField name="inventario" value={item.inventario} onChange={(e) => handleItemChange(index, e)} />
                  </TableCell>
                  <TableCell>
                    <TextField name="campo" value={item.campo} onChange={(e) => handleItemChange(index, e)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={agregarFila} variant="contained" color="secondary" style={{ marginTop: 10 }}>Agregar Fila</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancelar</Button>
          <Button onClick={agregarInventario} color="primary" variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sector1Page;
