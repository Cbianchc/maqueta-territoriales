import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>Panel de Administración</Typography>
        <Outlet />
      </Container>
    </Box>
  );
}