import React from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Breadcrumbs,
  Link as MuiLink 
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Link, useNavigate } from "react-router-dom";

const EjemploPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: 4,
      }}
    >
      
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink component={Link} to="/dashboard" color="inherit">
            Dashboard
          </MuiLink>
          <MuiLink component={Link} to="/dashboard/chequeo-tramo" color="inherit">
            Sub-area ejemplo
          </MuiLink>
          <Typography color="text.primary">Area de trabajo de ejemplo</Typography>
        </Breadcrumbs>
      
      <ConstructionIcon sx={{ fontSize: 100, color: "#ff9800" }} />
      <Typography variant="h4" sx={{ marginTop: 2, fontWeight: "bold" }}>
        ¡Estamos trabajando en esta página!
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1, color: "gray" }}>
        Pronto estará disponible. Gracias por tu paciencia.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={() => navigate(-1)}
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default EjemploPage;
