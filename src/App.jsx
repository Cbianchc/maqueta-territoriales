import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import theme from "./theme";

import Login from "./pages/Login";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import UserDashboard from "./pages/dashboards/UserDashboard";
import ReportDashboard from "./pages/dashboards/ReportDashboard";
import ChequeoTramoPage from "./pages/ChequeoTramo";
import AcuerdoMarcoLineasMoviles from "./pages/chequeTramoPages/AcuerdoMarcoLineasMoviles";
import TelefonicaMovilesPage from "./pages/chequeTramoPages/TelefonicaMovilesPage ";
import TelefonicaFijasPage from "./pages/chequeTramoPages/TelefonicaFijasPage";
import EjemploPage from "./pages/chequeTramoPages/EjemploPage";
import Usuarios from "./pages/Usuarios"; 
import ExcelUno from "./pages/ExcelUno";
import Inventarios from "./pages/inventarios/Inventarios";
import Sector1Page from "./pages/inventarios/Sector1Page"

function DashboardSelector() {
  const { user } = useAuth();

  if (!user) return <h2>Cargando...</h2>;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "user":
      return <UserDashboard />;
    case "reporte":
      return <ReportDashboard />;
    default:
      return <h2>No tienes permisos</h2>;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardSelector />} />
            <Route path="/dashboard/usuarios" element={<Usuarios />} />
            <Route path="/dashboard/excel1" element={<ExcelUno />} />
            <Route path="/dashboard/inventarios" element={<Inventarios />} />
            <Route path="/dashboard/inventarios/sector1" element={<Sector1Page />} />
            <Route path="/dashboard/inventarios/sector2" element={<Sector1Page />} />
            <Route path="/dashboard/inventarios/sector3" element={<Sector1Page />} />
            <Route path="/dashboard/inventarios/sector4" element={<Sector1Page />} />
            <Route path="/dashboard/inventarios/sector5" element={<Sector1Page />} />

            <Route path="/dashboard/chequeo-tramo" element={<ChequeoTramoPage />} />
            <Route path="/dashboard/chequeo-tramo/acuerdo-marco-lineas-moviles" element={<AcuerdoMarcoLineasMoviles />}/>
            <Route path="/dashboard/chequeo-tramo/telefonica-moviles" element={<TelefonicaMovilesPage />} />
            <Route path="/dashboard/chequeo-tramo/telefonica-fijas" element={<TelefonicaFijasPage />} />
            <Route path="/dashboard/chequeo-tramo/telefonica-servicios" element={<EjemploPage />} />
            <Route path="/dashboard/chequeo-tramo/telefonica-enlaces" element={<EjemploPage />} />
            <Route path="/dashboard/chequeo-tramo/telecom" element={<EjemploPage />} />
            <Route path="/dashboard/chequeo-tramo/claro" element={<EjemploPage />} />
            <Route path="/dashboard/chequeo-tramo/telecentro" element={<EjemploPage />} /> 
            <Route path="/dashboard/chequeo-tramo/metrotel" element={<EjemploPage />} />
            <Route path="/dashboard/chequeo-tramo/iplan" element={<EjemploPage />} />
            <Route path="/dashboard/chequeo-tramo/licencias" element={<EjemploPage />} />
            <Route path="/dashboard/chequeo-tramo/musurit" element={<EjemploPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import theme from "./theme";
// import { ThemeProvider } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";
// import { AuthProvider } from "./contexts/AuthContext";

// import Login from "./pages/Login"; 
// import Usuarios from "./pages/Usuarios"; 
// import Areas from "./pages/Areas";
// import ChequeoTramo from "./pages/ChequeoTramo";
// import AcuerdoMarcoLineasMoviles from "./pages/chequeTramoPages/AcuerdoMarcoLineasMoviles";
// import TelefonicaMovilesPage from "./pages/chequeTramoPages/TelefonicaMovilesPage ";
// import TelefonicaFijasPage from "./pages/chequeTramoPages/TelefonicaFijasPage";

// import Inventarios from "./pages/inventarios/inventarios";
// import Sector1Page from "./pages/inventarios/Sector1Page";

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AuthProvider> 
//         <Router>
//           <Routes>
//             {/* Rutas fuera del dashboard */}
//             <Route path="/" element={<Login />} />
//             <Route path="/login" element={<Login />} />

//             {/* Dashboard con Sidebar */}
//             <Route path="/dashboard" element={<Layout />}>
//               <Route index element={<h2>Bienvenido al Dashboard</h2>} />
//               <Route path="usuarios" element={<Usuarios />} />
//               <Route path="excel1" element={<Areas />} />

//               {/* Ruta para Chequeo para Tramo */}
//               <Route path="chequeo-tramo" element={<ChequeoTramo />} />
//               <Route path="chequeo-tramo/acuerdo-marco-lineas-moviles" element={<AcuerdoMarcoLineasMoviles />}/>
//               <Route path="chequeo-tramo/telefonica-moviles" element={<TelefonicaMovilesPage />} />
//               <Route path="chequeo-tramo/telefonica-fijas" element={<TelefonicaFijasPage />} />
//               {/* <Route path="chequeo-tramo/telefonica-servicios" element={<TelefonicaServiciosPage />} /> */}
//               {/* <Route path="chequeo-tramo/telefonica-enlaces" element={<TelefonicaEnlacesPage />} /> */}
//               {/* <Route path="chequeo-tramo/telecom" element={<TelecomPage />} /> */}
//               {/* <Route path="chequeo-tramo/claro" element={<ClaroPage />} /> */}
//               {/* <Route path="chequeo-tramo/telecentro" element={<TelecentroPage />} /> */}
//               {/* <Route path="chequeo-tramo/metrotel" element={<MetrotelPage />} /> */}
//               {/* <Route path="chequeo-tramo/iplan" element={<IplanPage />} /> */}
//               {/* <Route path="chequeo-tramo/licencias" element={<LicenciasPage />} /> */}
//               {/* <Route path="chequeo-tramo/musurit" element={<MusuritPage />} /> */}
              
              
//               <Route path="inventarios" element={<Inventarios />} />
//               <Route path="inventarios/sector1" element={<Sector1Page />} />




//               <Route path="excelnuevo" element={<h2>Excel sin page</h2>} />
//               <Route path="docs1" element={<h2>docs sin page</h2>} />
//             </Route>
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;
