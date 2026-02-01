import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Stack } from "@mui/material";
import { fetchLibroById, deleteLibro, fetchAutores } from "../services/libroService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './LibroDetail.css'; 

export default function LibroDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);
  const [nombreAutor, setNombreAutor] = useState("Cargando..."); 
  
  const mediaUrl = import.meta.env.VITE_MEDIA_URL || 'http://127.0.0.1:8000';

  const loadLibro = useCallback(async () => {
    try {
      
      const libroData = await fetchLibroById(id);
      setLibro(libroData);

      
      const listaAutores = await fetchAutores();
      const autorEncontrado = listaAutores.find(a => a.id === libroData.autor);
      
      if (autorEncontrado) {
        
        const completo = `${autorEncontrado.nombre} ${autorEncontrado.apellido || ''}`.trim();
        setNombreAutor(completo);
      } else {
        setNombreAutor("Autor no encontrado");
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }, [id]);

  useEffect(() => {
    loadLibro();
  }, [loadLibro]);

  const handleDelete = async () => {
    if (window.confirm("¿Deseas eliminar este libro?")) {
      try {
        await deleteLibro(id);
        alert("Eliminado con éxito");
        navigate("/libros");
      } catch (error) {
        alert("Error al eliminar.");
      }
    }
  };

  if (!libro) return (
    <Container className="detail-container">
      <Typography>Cargando detalles...</Typography>
    </Container>
  );

  return (
    <Container maxWidth="md" className="detail-container">
      {/* Titulo principal */}
      <Typography variant="h3" className="detail-title">
        {libro.titulo}
      </Typography>
      
      <Typography variant="h5" className="detail-subtitle">
        Información del Libro
      </Typography>
      
      {/* Lista de detalles */}
      <Box component="ul" className="detail-list">
        <li>
          <Typography variant="body1"><strong>Género:</strong> {libro.genero}</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Año de Publicación:</strong> {libro.fecha_publicacion}</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Autor:</strong> {nombreAutor}</Typography>
        </li>
      </Box>

      {/* --- SECCION RESUMEN --- */}
      {libro.resumen && (
        <Box sx={{ mt: 3, mb: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #00AEEF' }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Resumen</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: '#555' }}>
                {libro.resumen}
            </Typography>
        </Box>
      )}
      {/* ------------------------------ */}

      {/* Imagen */}
      <Box 
        className="detail-image-box" 
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 3 }}
      >
        <img 
          src={libro.portada ? `${mediaUrl}/${libro.portada}` : "https://via.placeholder.com/300x450?text=Sin+Portada"} 
          alt={libro.titulo} 
          className="detail-image"
          style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </Box>

      {/* Botones */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4, mb: 4 }}>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/libros")} 
          className="btn-back"
          sx={{ bgcolor: '#ccc', color: '#333', '&:hover': { bgcolor: '#bbb' } }}
        >
          Volver
        </Button>

        <Button 
          variant="contained" 
          startIcon={<EditIcon />}
          onClick={() => navigate(`/libros/edit/${libro.id}`)}
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