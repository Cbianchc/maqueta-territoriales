import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  Container,
  Divider,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { 
  Add as AddIcon, 
  ArrowBack as ArrowBackIcon,
  GetApp as GetAppIcon,
  Print as PrintIcon, 
  FilterList as FilterListIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const TelefonicaMovilesPage = () => {
  const navigate = useNavigate();
  
  // Columnas de la tabla
  const columns = [
    { id: 'id', label: 'ID', minWidth: 80 },
    { id: 'linea', label: 'Linea', minWidth: 120 },
    { id: 'plan', label: 'Plan', minWidth: 150 },
    { id: 'usuario', label: 'Usuario', minWidth: 200 },
    { id: 'cargo', label: 'Cargo', minWidth: 150 },
  ];
  
  // Generamos algunas filas vacías para la tabla
  const emptyRows = Array(10).fill().map((_, index) => ({
    id: `${index + 1}`,
    linea: '',
    plan: '',
    usuario: '',
    cargo: '',
  }));

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      {/* Encabezado con Breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink component={Link} to="/dashboard" color="inherit">
            Dashboard
          </MuiLink>
          <MuiLink component={Link} to="/dashboard/chequeo-tramo" color="inherit">
            Chequeo para Tramo
          </MuiLink>
          <Typography color="text.primary">Telefónica Líneas Móviles</Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="500" sx={{ mb: 1 }}>
              Telefónica Líneas Móviles
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gestión de líneas móviles de Telefónica
            </Typography>
          </Box>
          
          <Box>
            <Button 
              variant="outlined" 
              startIcon={<ArrowBackIcon />} 
              sx={{ mr: 2 }}
              component={Link}
              to="/dashboard/chequeo-tramo"
            >
              Volver
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              color="primary"
            >
              Agregar nuevo
            </Button>
          </Box>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 4 }} />
      
      {/* Tarjetas de resumen */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#f1f8fe', height: '100%' }}>
            <CardContent>
              <Typography color="primary" variant="subtitle2" gutterBottom>
                Total Líneas
              </Typography>
              <Typography variant="h4" component="div">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#f1f8fe', height: '100%' }}>
            <CardContent>
              <Typography color="primary" variant="subtitle2" gutterBottom>
                Activas
              </Typography>
              <Typography variant="h4" component="div">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#f1f8fe', height: '100%' }}>
            <CardContent>
              <Typography color="primary" variant="subtitle2" gutterBottom>
                Por vencer este mes
              </Typography>
              <Typography variant="h4" component="div">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#f1f8fe', height: '100%' }}>
            <CardContent>
              <Typography color="primary" variant="subtitle2" gutterBottom>
                Con observaciones
              </Typography>
              <Typography variant="h4" component="div">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Acciones para la tabla */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Tooltip title="Exportar">
            <IconButton sx={{ mr: 1 }}>
              <GetAppIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Imprimir">
            <IconButton sx={{ mr: 1 }}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Buscar">
            <IconButton sx={{ mr: 1 }}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filtrar">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Tabla estilo Excel */}
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 340px)' }}>
          <Table stickyHeader aria-label="tabla de lineas móviles">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, backgroundColor: '#f5f5f5' }}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {emptyRows.map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default TelefonicaMovilesPage;

