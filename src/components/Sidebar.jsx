import { useState, useContext } from "react";
import { 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, IconButton, Divider, Tooltip, Collapse 
} from "@mui/material";
import { 
  People, TableChart, ExitToApp, Menu as MenuIcon, 
  ExpandLess, ExpandMore, MenuOpen, Assignment, Inventory 
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(true);
  const [openExcel4, setOpenExcel4] = useState(false);

  const toggleSidebar = () => setOpen(!open);
  const toggleExcel4 = () => setOpenExcel4(!openExcel4);

  // Opciones de menú
  const menuItems = [
    { text: "Usuarios", icon: <People />, path: "/dashboard/usuarios"},
    { text: "Areas", icon: <TableChart />, path: "/dashboard/excel1" },
    { text: "Chequeo para Tramo", icon: <Assignment />, path: "/dashboard/chequeo-tramo" },
    { 
      text: "Inventarios", icon: <Inventory />, path: "/dashboard/inventarios"
      // hasSubmenu: true,
      // action: toggleExcel4
    },
    { text: "Excel nuevo", icon: <TableChart />, path: "/dashboard/excelnuevo" },
    { text: "Docs territoriales", icon: <TableChart />, path: "/dashboard/docs1" },
    { text: "Cerrar Sesión", icon: <ExitToApp />, path: "/logout" }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 70,
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          backgroundColor: "#f8f9fa",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          border: "none"
        }
      }}
    >
      <IconButton 
        onClick={toggleSidebar} 
        sx={{ 
          margin: "16px auto", 
          display: "block",
          backgroundColor: "#f0f2f5",
          borderRadius: "8px",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "#e0e2e5",
            transform: "scale(1.05)"
          }
        }}
      >
        {open ? <MenuOpen color="primary" /> : <MenuIcon color="primary" />}
      </IconButton>

      <Divider sx={{ margin: "0 8px 8px 8px" }} />

      <List sx={{ padding: "8px" }}>
        {menuItems.map((item, index) => {
          // Verifica si el usuario tiene permiso para ver el ítem
          if (item.role && user?.role !== item.role && !user?.createdUsers.includes(item.path)) {
            return null;
          }

          return (
            <div key={index}>
              <Tooltip title={!open ? item.text : ""} placement="right">
                {item.hasSubmenu ? (
                  <ListItem disablePadding sx={{ mb: 1, borderRadius: "8px", overflow: "hidden", "&:hover": { backgroundColor: "#e0e2e5" } }}>
                    <ListItemButton onClick={item.action}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      {open && (
                        <>
                          <ListItemText primary={item.text} />
                          {openExcel4 ? <ExpandLess /> : <ExpandMore />}
                        </>
                      )}
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem disablePadding sx={{ mb: 1, borderRadius: "8px", overflow: "hidden", "&:hover": { backgroundColor: "#e0e2e5" } }}>
                    <ListItemButton component={Link} to={item.path}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      {open && <ListItemText primary={item.text} />}
                    </ListItemButton>
                  </ListItem>
                )}
              </Tooltip>
            </div>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;

// import { useState, useContext } from "react";
// import { 
//   Drawer, 
//   List, 
//   ListItem, 
//   ListItemButton, 
//   ListItemIcon, 
//   ListItemText, 
//   IconButton, 
//   Divider, 
//   Tooltip,
//   Collapse
// } from "@mui/material";
// import { 
//   People, 
//   TableChart, 
//   ExitToApp, 
//   Menu as MenuIcon,
//   ExpandLess,
//   ExpandMore,
//   MenuOpen,
//   Assignment,
//   Inventory
// } from "@mui/icons-material";
// import { AuthContext } from "../contexts/AuthContext";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   const { user } = useContext(AuthContext);

//   const [open, setOpen] = useState(true);
//   const [openExcel4, setOpenExcel4] = useState(false);

//   const toggleSidebar = () => setOpen(!open);
//   const toggleExcel4 = () => setOpenExcel4(!openExcel4);

//   // Opciones para la lista desplegable de Inventarios
//   const excel4Options = [
//     { text: "Inventario General", path: "/dashboard/excel4/general" },
//     { text: "Por Categoría", path: "/dashboard/excel4/categoria" },
//     { text: "Por Ubicación", path: "/dashboard/excel4/ubicacion" }
//   ];

//   // Menú principal
//   const menuItems = [
//     { text: "Usuarios", icon: <People />, path: "/dashboard/usuarios" },
//     { text: "Areas", icon: <TableChart />, path: "/dashboard/excel1" },
//     // Ahora Chequeo para Tramo es un ítem simple sin submenú
//     { text: "Chequeo para Tramo", icon: <Assignment />, path: "/dashboard/chequeo-tramo" },
//     { 
//       text: "Inventarios", 
//       icon: <Inventory />, 
//       hasSubmenu: true,
//       action: toggleExcel4
//     },
//     { text: "Excel nuevo", icon: <TableChart />, path: "/dashboard/excel5" },
//     { text: "Docs territoriales", icon: <TableChart />, path: "/dashboard/docs1" },
//     { text: "Cerrar Sesión", icon: <ExitToApp />, path: "/logout" }
//   ];

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: open ? 240 : 70,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: open ? 240 : 70,
//           transition: "width 0.3s ease-in-out",
//           overflowX: "hidden",
//           backgroundColor: "#f8f9fa",
//           boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//           border: "none"
//         }
//       }}
//     >
//       {/* Botón de alternar con mejor estética */}
//       <IconButton 
//         onClick={toggleSidebar} 
//         sx={{ 
//           margin: "16px auto", 
//           display: "block",
//           backgroundColor: "#f0f2f5",
//           borderRadius: "8px",
//           transition: "all 0.2s",
//           "&:hover": {
//             backgroundColor: "#e0e2e5",
//             transform: "scale(1.05)"
//           }
//         }}
//       >
//         {open ? <MenuOpen color="primary" /> : <MenuIcon color="primary" />}
//       </IconButton>

//       <Divider sx={{ margin: "0 8px 8px 8px" }} />

//       {/* Lista de opciones */}
//       <List sx={{ padding: "8px" }}>
//         {menuItems.map((item, index) => (
//           <div key={index}>
//             <Tooltip title={!open ? item.text : ""} placement="right">
//               {item.hasSubmenu ? (
//                 <ListItem 
//                   disablePadding 
//                   sx={{ 
//                     mb: 1, 
//                     borderRadius: "8px",
//                     overflow: "hidden",
//                     "&:hover": { backgroundColor: "#e0e2e5" }
//                   }}
//                 >
//                   <ListItemButton onClick={item.action}>
//                     <ListItemIcon>
//                       {item.icon}
//                     </ListItemIcon>
//                     {open && (
//                       <>
//                         <ListItemText primary={item.text} />
//                         {openExcel4 ? <ExpandLess /> : <ExpandMore />}
//                       </>
//                     )}
//                   </ListItemButton>
//                 </ListItem>
//               ) : (
//                 <ListItem 
//                   disablePadding 
//                   sx={{ 
//                     mb: 1, 
//                     borderRadius: "8px",
//                     overflow: "hidden",
//                     "&:hover": { backgroundColor: "#e0e2e5" }
//                   }}
//                 >
//                   <ListItemButton component={Link} to={item.path}>
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     {open && <ListItemText primary={item.text} />}
//                   </ListItemButton>
//                 </ListItem>
//               )}
//             </Tooltip>

//             {/* Submenú para Inventarios */}
//             {item.text === "Inventarios" && (
//               <Collapse in={open && openExcel4} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   {excel4Options.map((option, optIndex) => (
//                     <ListItemButton 
//                       key={optIndex} 
//                       component={Link} 
//                       to={option.path}
//                       sx={{ 
//                         pl: 4,
//                         borderRadius: "8px",
//                         mx: 1,
//                         my: 0.5,
//                         "&:hover": { backgroundColor: "#e0e2e5" }
//                       }}
//                     >
//                       <ListItemIcon>
//                         <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#f0f0f0" }}></div>
//                       </ListItemIcon>
//                       <ListItemText primary={option.text} />
//                     </ListItemButton>
//                   ))}
//                 </List>
//               </Collapse>
//             )}
//           </div>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;

