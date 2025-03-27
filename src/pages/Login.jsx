import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Container, Box, TextField, Button, Typography, Paper } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Se mantiene para el formulario, pero no se usa
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const backgroundImage = "/5590457.jpg";

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulación de usuarios
    let role = null;
    switch (email.toLowerCase()) {
      case "pipi@renaper.com":
        role = "admin";
        break;
      case "user@renaper.com":
        role = "user";
        break;
      case "reporte@renaper.com":
        role = "reporte";
        break;
      default:
        alert("Usuario no encontrado");
        return;
    }

    // Guardar usuario en el contexto (AuthProvider)
    setUser({
      email,
      role,
    });

    // Redirigir al dashboard
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >


      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, mt: 10, textAlign: "center" }}>
          <Typography variant="h2" sx={{ mb: 3 }}>Gestion Territoriales</Typography>
          <Typography variant="h1">Acceso</Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Correo Electrónico" type="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Contraseña" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Iniciar Sesión
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}



