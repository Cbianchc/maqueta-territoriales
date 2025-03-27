// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";

// import Login from "./pages/Login2";
// import Usuarios from "./pages/Usuarios";
// import ExcelUno from "./pages/ExcelUno";

// import { ThemeProvider, CssBaseline } from "@mui/material";
// import theme from "./theme"; 
// import { AuthProvider } from "./contexts/AuthContext2"; // Importa el AuthProvider

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <AuthProvider> {/* Envuelve tu aplicación con el AuthProvider */}
//       <Router>
//         <Routes>
//           {/* Rutas fuera del dashboard */}
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />

//           {/* Dashboard con Sidebar */}
//           <Route path="/dashboard" element={<Layout />}>
//             <Route index element={<h2>Bienvenido al Dashboard</h2>} />
//             <Route path="usuarios" element={<Usuarios />} />
//             <Route path="excel1" element={<ExcelUno />} />
//             <Route path="excel2" element={<h2>Excel 2</h2>} />
//             <Route path="excel3" element={<h2>Excel 3</h2>} />
//           </Route>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   </ThemeProvider>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

