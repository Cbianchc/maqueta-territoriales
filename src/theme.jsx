import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003366", // Azul oscuro institucional
    },
    secondary: {
      main: "#666", // Gris sobrio
    },
    background: {
      default: "#f5f5f5", // Fondo claro
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#003366",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#333",
    },
  },
});

export default theme;
