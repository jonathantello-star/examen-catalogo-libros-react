import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import logoLibreria from '../assets/libreria-logo.png'; 
import './Header.css';

export default function Header() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("access_token");

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate('/login');
    };

    return (
        <Container maxWidth="lg" className="header-main-wrapper">
            <Box className="header-banner">
                {}
                <Box 
                    component="img" 
                    src={logoLibreria} 
                    alt="Logo Libros" 
                    className="header-logo"
                    onClick={() => navigate('/')}
                />
                
                <Box className="nav-menu">
                    <Typography component={Link} to="/libros" className="nav-item">
                        Libros
                    </Typography>

                    <Typography component={Link} to="/autores" className="nav-item">
                        Autores
                    </Typography>
                    
                    {isLoggedIn ? (
                        <Typography onClick={handleLogout} className="nav-item" component="span">
                            Cerrar sesión
                        </Typography>
                    ) : (
                        <Typography component={Link} to="/login" className="nav-item">
                            Iniciar sesión
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
}