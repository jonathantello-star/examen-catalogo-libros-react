import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import AutorCard from "../components/AutorCard";
import './AutorList.css'; 

export default function AutorList() {
    const [autores, setAutores] = useState([]);
    const navigate = useNavigate();
    // Verificamos si está logueado
    const isAuthenticated = !!localStorage.getItem("access_token");

    useEffect(() => {
        const fetchAutores = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/autores/");
                setAutores(response.data);
            } catch (error) {
                console.error("Error al obtener autores:", error);
            }
        };
        fetchAutores();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este autor?")) {
            try {
                const token = localStorage.getItem("access_token");
                await axios.delete(`http://127.0.0.1:8000/api/autores/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAutores(autores.filter(a => a.id !== id));
            } catch (error) {
                console.log(error);
                alert("No se pudo eliminar el autor.");
            }
        }
    };

    return (
        <Container maxWidth="lg" className="autor-list-container">
            <Box className="autor-header-box">
                <Typography variant="h4" fontWeight="bold" className="autor-list-title">
                    Catálogo de Autores
                </Typography>
                
                {/* SOLO MOSTRAMOS EL BOTÓN SI ESTÁ LOGUEADO */}
                {isAuthenticated && (
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/autores/new')}
                        className="btn-add-autor"
                    >
                        Agregar Autor
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {autores.map((autor) => (
                    <Grid key={autor.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <AutorCard 
                            autor={autor} 
                            onDelete={handleDelete}
                            onEdit={(id) => navigate(`/autores/edit/${id}`)}
                            onView={(id) => navigate(`/autores/${id}`)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}