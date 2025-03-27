import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink
} from "@mui/material";
import UsuarioModal from "../components/UsuarioModal";
import PermisosModal from "../components/PermisosModal";
import areasData from "../utils/areas.json";
import usuariosData from "../utils/usuarios.json"; // Importamos los usuarios desde JSON
import { Link, useNavigate } from 'react-router-dom';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newUser, setNewUser] = useState({ nombre: "", apellido: "", email: "", telefono: "", area: "", rol: "" });
  const [areas, setAreas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [openPermisos, setOpenPermisos] = useState(false);

  useEffect(() => {
    setUsuarios(usuariosData); // Carga los usuarios desde el JSON
    setAreas(areasData);
  }, []);

  const handleOpen = (user = null) => {
    if (user) {
      setNewUser(user);
      setSelectedUserId(user.id);
      setEditMode(true);
      const selectedArea = areas.find(area => area.nombre === user.area);
      setRoles(selectedArea ? selectedArea.roles : []);
    } else {
      setNewUser({ nombre: "", apellido: "", email: "", telefono: "", area: "", rol: "" });
      setEditMode(false);
      setSelectedUserId(null);
    }
    setOpen(true);
  };

  const handleOpenPermisos = (user) => {
    if (!user) {
      console.error("No se ha seleccionado un usuario para editar permisos");
      return;
    }
    setSelectedUserId(user.id);
    setOpenPermisos(true);
  };

  const handleClose = () => setOpen(false);
  const handleClosePermisos = () => setOpenPermisos(false);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    if (e.target.name === "area") {
      const selectedArea = areas.find(area => area.nombre === e.target.value);
      setRoles(selectedArea ? selectedArea.roles : []);
    }
  };

  const handleSave = () => {
    if (!newUser.email || !newUser.nombre || !newUser.apellido) {
      return alert("Completa todos los campos");
    }

    if (editMode) {
      setUsuarios(usuarios.map(user => (user.id === selectedUserId ? { ...user, ...newUser } : user)));
    } else {
      const newId = (usuarios.length + 1).toString(); // Genera un ID simple
      setUsuarios([...usuarios, { id: newId, ...newUser }]);
    }

    handleClose();
  };

  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter(user => user.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Título y breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink component={Link} to="/dashboard" color="inherit">
            Dashboard
          </MuiLink>
          <Typography color="text.primary">Usuarios</Typography>
        </Breadcrumbs>
        <Typography variant="h4" component="h1" fontWeight="500" sx={{ mb: 1 }}>
          Lista de usuarios
        </Typography>

      </Box>
      <TableContainer component={Paper} sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>Administrar Usuarios</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>Crear Usuario</Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Teléfono</strong></TableCell>
              <TableCell><strong>Área</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.telefono}</TableCell>
                <TableCell>{usuario.area}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleOpen(usuario)}>Editar</Button>
                  <Button color="secondary" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</Button>
                  <Button color="secondary" onClick={() => handleOpenPermisos(usuario)}>Permisos</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UsuarioModal
        open={open}
        handleClose={handleClose}
        newUser={newUser}
        handleChange={handleChange}
        areas={areas}
        roles={roles}
        editMode={editMode}
        handleSave={handleSave}
      />

      <PermisosModal
        open={openPermisos}
        handleClose={handleClosePermisos}
        userId={selectedUserId}
        userPermisos={newUser.permisos || {}}
        setUserPermisos={(updatedPermisos) => {
          setNewUser((prev) => ({ ...prev, permisos: updatedPermisos }));
        }}
        areas={areas}
      />

    </Container>
  );
};


// import React, { useState, useEffect } from "react";
// import { db } from "../services/firebase";
// import { collection, getDocs, deleteDoc, doc, addDoc, setDoc, updateDoc } from "firebase/firestore";
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography
// } from "@mui/material";
// import UsuarioModal from "../components/UsuarioModal";
// import PermisosModal from "../components/PermisosModal";
// import areasData from "../utils/areas.json";
// // import RolesModal from "../components/RolesModal";

// export default function Usuarios() {
//   const [usuarios, setUsuarios] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [newUser, setNewUser] = useState({ nombre: "", apellido: "", email: "", telefono: "", area: "", rol: "" });
//   const [areas, setAreas] = useState([]);
//   const [roles, setRoles] = useState([]);

//   // const [openRoles, setOpenRoles] = useState(false);
//   const [openPermisos, setOpenPermisos] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const querySnapshot = await getDocs(collection(db, "users"));
//       setUsuarios(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     };

//     fetchUsers();
//     setAreas(areasData);
//   }, []);

//   const handleOpen = (user = null) => {
//     if (user) {
//       setNewUser(user);
//       setSelectedUserId(user.id);
//       setEditMode(true);
//       const selectedArea = areas.find(area => area.nombre === user.area);
//       setRoles(selectedArea ? selectedArea.roles : []);
//     } else {
//       setNewUser({ nombre: "", apellido: "", email: "", telefono: "", area: "", rol: "", password: "" });
//       setEditMode(false);
//       setSelectedUserId(null);
//     }
//     setOpen(true);
//   };

//   const handleOpenRoles = () => {
//     setOpenRoles(true);
//   }

//   const handleOpenPermisos = (user) => {
//     if (!user) {
//       console.error("No se ha seleccionado un usuario para editar permisos");
//       return;
//     }
//     setSelectedUserId(user.id);
//     setOpenPermisos(true);
//   };

//   const handleClose = () => setOpen(false);
//   const handleCloseRoles = () => setOpenRoles(false);
//   const handleClosePermisos = () => setOpenPermisos(false);

//   const handleChange = (e) => {
//     setNewUser({ ...newUser, [e.target.name]: e.target.value });
//     if (e.target.name === "area") {
//       const selectedArea = areas.find(area => area.nombre === e.target.value);
//       setRoles(selectedArea ? selectedArea.roles : []);
//     }
//   };

//   // const handleSave = async () => {
//   //   if (!newUser.email || !newUser.nombre || !newUser.apellido) return alert("Completa todos los campos");

//   //   if (editMode) {
//   //     await updateDoc(doc(db, "users", selectedUserId), newUser);
//   //     setUsuarios(usuarios.map(user => (user.id === selectedUserId ? { ...user, ...newUser } : user)));
//   //   } else {
//   //     const docRef = await addDoc(collection(db, "users"), newUser);
//   //     setUsuarios([...usuarios, { id: docRef.id, ...newUser }]);
//   //   }

//   //   handleClose();
//   // };
//   const handleSave = async () => {
//     if (!newUser.email || !newUser.nombre || !newUser.apellido) {
//       return alert("Completa todos los campos");
//     }

//     try {
//       if (editMode) {
//         // Actualización de un usuario existente en Firestore
//         await updateDoc(doc(db, "users", selectedUserId), newUser);
//         setUsuarios(usuarios.map(user => (user.id === selectedUserId ? { ...user, ...newUser } : user)));
//       } else {
//         // 1. Crear usuario en Firebase Authentication
//         const { createUserWithEmailAndPassword } = await import("firebase/auth");
//         const { auth } = await import("../services/firebase");

//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           newUser.email,
//           // "contraseñaTemporal123" // Contraseña temporal
//           newUser.password
//         );
//         const createdUser = userCredential.user;

//         // 2. Guardar datos adicionales en Firestore
//         const userDocRef = doc(db, "users", createdUser.uid); // Usa el UID del usuario creado
//         await setDoc(userDocRef, {
//           nombre: newUser.nombre,
//           apellido: newUser.apellido,
//           email: newUser.email,
//           telefono: newUser.telefono,
//           area: newUser.area,
//           rol: newUser.rol,
//           permisos: {}, // Inicia con permisos vacíos o como prefieras
//         });

//         setUsuarios([...usuarios, { id: createdUser.uid, ...newUser }]);
//       }

//       console.log("Usuario creado en Authentication y Firestore");
//       handleClose(); // Cierra el modal
//     } catch (error) {
//       console.error("Error al guardar el usuario:", error.message);
//     }
//   };


//   const eliminarUsuario = async (id) => {
//     await deleteDoc(doc(db, "users", id));
//     setUsuarios(usuarios.filter(user => user.id !== id));
//   };

//   const updateAreas = (newAreas) => {
//     setAreas(newAreas);
//   };

//   return (
//     <>
//       <TableContainer component={Paper} sx={{ p: 2 }}>
//         <Typography variant="h2" sx={{ mb: 2 }}>Administrar Usuarios</Typography>
//         <Button variant="contained" color="primary" onClick={() => handleOpen()}>Crear Usuario</Button>
//         <Button variant="outlined" color="info" onClick={() => handleOpenRoles()}>Editar Roles y Áreas</Button>

//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Nombre</strong></TableCell>
//               <TableCell><strong>Apellido</strong></TableCell>
//               <TableCell><strong>Email</strong></TableCell>
//               <TableCell><strong>Teléfono</strong></TableCell>
//               <TableCell><strong>Área</strong></TableCell>
//               <TableCell><strong>Rol</strong></TableCell>
//               <TableCell><strong>Acciones</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {usuarios.map((usuario) => (
//               <TableRow key={usuario.id}>
//                 <TableCell>{usuario.nombre}</TableCell>
//                 <TableCell>{usuario.apellido}</TableCell>
//                 <TableCell>{usuario.email}</TableCell>
//                 <TableCell>{usuario.telefono}</TableCell>
//                 <TableCell>{usuario.area}</TableCell>
//                 <TableCell>{usuario.rol}</TableCell>
//                 <TableCell>
//                   <Button color="primary" onClick={() => handleOpen(usuario)}>Editar</Button>
//                   <Button color="secondary" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</Button>
//                   <Button color="secondary" onClick={() => handleOpenPermisos(usuario)}>Permisos</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <UsuarioModal
//         open={open}
//         handleClose={handleClose}
//         newUser={newUser}
//         handleChange={handleChange}
//         areas={areas}
//         roles={roles}
//         editMode={editMode}
//         handleSave={handleSave}
//       />

//       {/* <RolesModal
//       open={openRoles}
//       handleClose={handleCloseRoles}
//       areas={areas}
//       updateAreas={updateAreas}
//       /> */}

//       <PermisosModal
//         open={openPermisos}
//         handleClose={handleClosePermisos}
//         userId={selectedUserId}
//         userPermisos={newUser.permisos || {}}
//         setUserPermisos={(updatedPermisos) => {
//           setNewUser((prev) => ({ ...prev, permisos: updatedPermisos }));
//         }}
//         areas={areas} // Carga las áreas desde el JSON
//       />

//     </>
//   );
// }
