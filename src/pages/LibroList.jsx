import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import LibroCard from "../components/LibroCard";
import './LibroList.css'; 

export default function LibroList() {
    const [libros, setLibros] = useState([]);
    const navigate = useNavigate();
    // Verificamos si está logueado
    const isAuthenticated = !!localStorage.getItem("access_token");

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/libros/");
                setLibros(response.data);
            } catch (error) {
                console.error("Error al obtener libros:", error);
            }
        };
        fetchLibros();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este libro?")) {
            try {
                const token = localStorage.getItem("access_token");
                await axios.delete(`http://127.0.0.1:8000/api/libros/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLibros(libros.filter(l => l.id !== id));
            } catch (error) {
                console.log(error);
                alert("No se pudo eliminar el libro.");
            }
        }
    };

    return (
        <Container maxWidth="lg" className="libro-list-container">
            <Box className="libro-header-box">
                <Typography variant="h4" fontWeight="bold" className="libro-list-title">
                    Catálogo de Libros
                </Typography>
                
                {/* SOLO MOSTRAMOS EL BOTÓN SI ESTÁ LOGUEADO */}
                {isAuthenticated && (
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/libros/new')}
                        className="btn-add-libro"
                    >
                        Agregar Libro
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {libros.map((libro) => (
                    <Grid key={libro.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <LibroCard 
                            libro={libro} 
                            onDelete={handleDelete}
                            onEdit={(id) => navigate(`/libros/edit/${id}`)}
                            onView={(id) => navigate(`/libros/${id}`)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}