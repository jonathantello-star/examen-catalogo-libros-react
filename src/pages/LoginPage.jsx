import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner"; 
import { login } from "../services/authService";
import './LoginPage.css'; 

export default function LoginPage() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const responseData = await login(loginData.username, loginData.password);
            localStorage.setItem('access_token', responseData.access_token);
            alert("Inicio de sesión exitoso");
            navigate('/');
        } catch (error) {
            console.error("Error durante el login:", error);
            alert("Error al iniciar sesión");
        } finally {
            setLoading(false); 
        }
    }

    
    if (loading) {
        return <Spinner />;
    }

    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit} 
            className="login-container"
        >
            <Typography variant="h5" className="login-title">
                Inicio de sesión
            </Typography>
            <TextField
                label="Usuario"
                name="username"
                variant="outlined"
                value={loginData.username}
                onChange={handleChange}
                required
                className="login-input"
            />
            <TextField
                label="Contraseña"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
                variant="outlined"
                required
                className="login-input"
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                className="login-button"
            >
                Iniciar sesión
            </Button>
        </Box>
    );
}