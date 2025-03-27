import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  CardMedia,
  Divider,
  Container,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { 
  CallOutlined, 
  PhoneAndroidOutlined, 
  WifiOutlined,
  RouterOutlined,
  BusinessOutlined,
  SignalCellularAltOutlined,
  CableOutlined,
  StorageOutlined,
  DeveloperBoardOutlined,
  SdStorageOutlined
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

// Componente para cada tarjeta de área
const AreaCard = ({ title, icon, color, path }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        },
        borderTop: `3px solid ${color}`
      }}
    >
      <CardActionArea 
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}
        onClick={() => navigate(path)}
      >
        <Box 
          sx={{ 
            p: 2, 
            borderRadius: '50%', 
            backgroundColor: `${color}20`, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          {React.cloneElement(icon, { sx: { fontSize: 40, color: color } })}
        </Box>
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h6" component="div" fontWeight="500">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ChequeoTramoPage = () => {
  // Datos de las áreas con colores e iconos personalizados
  const areas = [
    { 
      title: "Acuerdo Marco Líneas Móviles", 
      icon: <SdStorageOutlined />, 
      color: "#FFC107", 
      path: "/dashboard/chequeo-tramo/acuerdo-marco-lineas-moviles" 
    },
    { 
      title: "Telefónica Líneas Móviles", 
      icon: <PhoneAndroidOutlined />, 
      color: "#0072CE", 
      path: "/dashboard/chequeo-tramo/telefonica-moviles" 
    },
    { 
      title: "Telefónica Líneas Fijas", 
      icon: <CallOutlined />, 
      color: "#009EE3", 
      path: "/dashboard/chequeo-tramo/telefonica-fijas" 
    },
    { 
      title: "Telefónica Servicios", 
      icon: <WifiOutlined />, 
      color: "#50ADE5", 
      path: "/dashboard/chequeo-tramo/telefonica-servicios" 
    },
    { 
      title: "Telefónica Enlaces", 
      icon: <RouterOutlined />, 
      color: "#0091D4", 
      path: "/dashboard/chequeo-tramo/telefonica-enlaces" 
    },
    { 
      title: "Telecom Completo", 
      icon: <BusinessOutlined />, 
      color: "#EF3340", 
      path: "/dashboard/chequeo-tramo/telecom" 
    },
    { 
      title: "Claro Completo", 
      icon: <SignalCellularAltOutlined />, 
      color: "#E40520", 
      path: "/dashboard/chequeo-tramo/claro" 
    },
    { 
      title: "Telecentro", 
      icon: <CableOutlined />, 
      color: "#FF5800", 
      path: "/dashboard/chequeo-tramo/telecentro" 
    },
    { 
      title: "Metrotel", 
      icon: <StorageOutlined />, 
      color: "#6B3FA0", 
      path: "/dashboard/chequeo-tramo/metrotel" 
    },
    { 
      title: "Iplan", 
      icon: <DeveloperBoardOutlined />, 
      color: "#00b0f0", 
      path: "/dashboard/chequeo-tramo/iplan" 
    },
    { 
      title: "Licencias CPE", 
      icon: <SdStorageOutlined />, 
      color: "#4CAF50", 
      path: "/dashboard/chequeo-tramo/licencias" 
    },
    { 
      title: "Musurit", 
      icon: <BusinessOutlined />, 
      color: "#FFC107", 
      path: "/dashboard/chequeo-tramo/musurit" 
    },
    // { 
    //   title: "Cotelcam", 
    //   icon: <BusinessOutlined />, 
    //   color: "#7E57C2", 
    //   path: "/dashboard/chequeo-tramo/cotelcam" 
    // }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Título y breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink component={Link} to="/dashboard" color="inherit">
            Dashboard
          </MuiLink>
          <Typography color="text.primary">Chequeo para Tramo</Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" fontWeight="500" sx={{ mb: 1 }}>
          Chequeo para Tramo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Seleccione un área para gestionar su información
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 4 }} />
      
      {/* Tarjetas de áreas */}
      <Grid container spacing={3}>
        {areas.map((area, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <AreaCard 
              title={area.title} 
              icon={area.icon} 
              color={area.color} 
              path={area.path} 
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ChequeoTramoPage;
