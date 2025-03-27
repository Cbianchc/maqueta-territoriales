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

const Inventarios = () => {
  const areas = [
    { 
      title: "Sector I", 
      icon: <SdStorageOutlined />, 
      color: "#FFC107", 
      path: "/dashboard/inventarios/sector1" 
    },
    { 
      title: "Sector II", 
      icon: <PhoneAndroidOutlined />, 
      color: "#0072CE", 
      path: "/dashboard/chequeo-tramo/telefonica-moviles" 
    },
    { 
      title: "Sector III", 
      icon: <CallOutlined />, 
      color: "#009EE3", 
      path: "/dashboard/chequeo-tramo/telefonica-fijas" 
    },
    { 
      title: "Sector VI", 
      icon: <WifiOutlined />, 
      color: "#50ADE5", 
      path: "/dashboard/chequeo-tramo/telefonica-servicios" 
    },
    { 
      title: "Sector V", 
      icon: <RouterOutlined />, 
      color: "#0091D4", 
      path: "/dashboard/chequeo-tramo/telefonica-enlaces" 
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Título y breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink component={Link} to="/dashboard" color="inherit">
            Dashboard
          </MuiLink>
          <Typography color="text.primary">Inventarios</Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" fontWeight="500" sx={{ mb: 1 }}>
          Inventarios
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Seleccione la seccion: 
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

export default Inventarios;
