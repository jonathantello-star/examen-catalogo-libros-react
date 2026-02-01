import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Stack } from "@mui/material";
import { fetchAutorById, deleteAutor } from "../services/autorService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './AutorDetail.css'; 

export default function AutorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [autor, setAutor] = useState(null);
  
  const mediaUrl = import.meta.env.VITE_MEDIA_URL || 'http://127.0.0.1:8000';

  const loadAutor = useCallback(async () => {
    try {
      const data = await fetchAutorById(id);
      setAutor(data);
    } catch (error) {
      console.error("Error al cargar autor:", error);
    }
  }, [id]);

  useEffect(() => {
    loadAutor();
  }, [loadAutor]);

  const handleDelete = async () => {
    if (window.confirm("¿Deseas eliminar este autor? Si tiene libros asignados, estos también podrían eliminarse.")) {
      try {
        await deleteAutor(id);
        alert("Autor eliminado con éxito");
        navigate("/autores");
      } catch (error) {
        alert("Error al eliminar.");
      }
    }
  };

  if (!autor) return (
    // Nombre de la clase
    <Container className="autor-detail-container">
      <Typography>Cargando detalles...</Typography>
    </Container>
  );

  const imageUrl = autor.foto 
    ? (autor.foto.startsWith('http') ? autor.foto : `${mediaUrl}/${autor.foto}`) 
    : "https://via.placeholder.com/300x450?text=Sin+Foto";

  return (
    // Nombre de la clase
    <Container maxWidth="md" className="autor-detail-container">
      {/* Titulo: nombre completo */}
      <Typography variant="h3" className="autor-detail-title">
        {autor.nombre} {autor.apellido}
      </Typography>
      
      <Typography variant="h5" className="autor-detail-subtitle">
        Información del Autor
      </Typography>
      
      <Box component="ul" className="autor-detail-list">
        <li>
          <Typography variant="body1"><strong>Nacionalidad:</strong> {autor.nacionalidad}</Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Fecha de Nacimiento:</strong> {autor.fecha_nacimiento || "No especificada"}
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Género Literario:</strong> {autor.genero_literario || "Varios"}
          </Typography>
        </li>
      </Box>

      {/* --- SECCION BIOGRAFIA --- */}
      {autor.biografia && (
        <Box sx={{ mt: 2, mb: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #00AEEF' }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Biografía</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontStyle: 'italic', color: '#555' }}>
                {autor.biografia}
            </Typography>
        </Box>
      )}

      {/* Imagen */}
      <Box 
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 3 }}
      >
        <img 
          src={imageUrl} 
          alt={`${autor.nombre} ${autor.apellido}`} 
          className="autor-detail-image" // CAMBIO 3: Clase actualizada
          style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </Box>

      {/* Botones */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4, mb: 4 }}>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/autores")} 
          className="btn-autor-back" // CAMBIO 4: Clase actualizada
          sx={{ bgcolor: '#ccc', color: '#333', '&:hover': { bgcolor: '#bbb' } }}
        >
          Volver
        </Button>

        <Button 
          variant="contained" 
          startIcon={<EditIcon />}
          onClick={() => navigate(`/autores/edit/${autor.id}`)}
          sx={{ bgcolor: '#00AEEF', color: 'white', '&:hover': { bgcolor: '#008ec3' } }}
        >
          Editar
        </Button>

        <Button 
          variant="contained" 
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{ bgcolor: '#ff4d4d', color: 'white', '&:hover': { bgcolor: '#cc0000' } }}
        >
          Eliminar
        </Button>
      </Stack>
    </Container>
  );
}