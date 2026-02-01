import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper, MenuItem } from "@mui/material";
import { fetchLibroById, addLibro, updateLibro, fetchAutores } from "../services/libroService";

export default function LibroForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    fecha_publicacion: "",
    autor: "",
    resumen: "", 
  });
  const [autores, setAutores] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchAutores().then(setAutores).catch(console.error);

    if (isEdit) {
      fetchLibroById(id).then((data) => {
        setFormData({
          titulo: data.titulo || "",
          genero: data.genero || "",
          fecha_publicacion: data.fecha_publicacion || "",
          autor: data.autor || "",
          resumen: data.resumen || "",
        });
      }).catch(console.error);
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSend = {
      titulo: formData.titulo,
      genero: formData.genero,
      fecha_publicacion: parseInt(formData.fecha_publicacion), 
      autor: formData.autor,
      resumen: formData.resumen,
      portada: file 
    };

    try {
      if (isEdit) {
        await updateLibro(id, dataToSend);
        alert("Libro actualizado correctamente");
      } else {
        await addLibro(dataToSend);
        alert("Libro creado correctamente");
      }
      navigate("/libros");
    } catch (error) {
      console.error("Error al guardar:", error.response?.data || error);
      alert("Error al guardar. Revisa que el ID del autor sea correcto.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: '15px' }}>
        <Typography variant="h5" mb={3} fontWeight="bold">
          {isEdit ? "Editar Libro" : "Nuevo Libro"}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField 
            label="Título" fullWidth margin="normal"
            value={formData.titulo} 
            onChange={(e) => setFormData({...formData, titulo: e.target.value})} 
            required 
          />
          
          <TextField 
            label="Género" fullWidth margin="normal"
            value={formData.genero} 
            onChange={(e) => setFormData({...formData, genero: e.target.value})} 
          />

          <TextField 
            label="Año de Publicación" type="number" fullWidth margin="normal"
            placeholder="Ej: 2025"
            value={formData.fecha_publicacion} 
            onChange={(e) => setFormData({...formData, fecha_publicacion: e.target.value})} 
            required
          />

          <TextField
            select
            label="Autor al que pertenece"
            fullWidth
            margin="normal"
            value={autores.length > 0 ? formData.autor : ""}
            onChange={(e) => setFormData({...formData, autor: e.target.value})}
            required
          >
            {autores.map((autor) => (
              <MenuItem key={autor.id} value={autor.id}>
                {/* Nombre y Apellido */}
                {autor.nombre} {autor.apellido}
              </MenuItem>
            ))}
          </TextField>

          <TextField 
            label="Resumen del Libro" 
            fullWidth 
            margin="normal"
            multiline 
            rows={4}
            value={formData.resumen} 
            onChange={(e) => setFormData({...formData, resumen: e.target.value})} 
          />
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="caption" display="block">Portada del Libro</Typography>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          </Box>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#00AEEF' }}>
            {isEdit ? "Actualizar Libro" : "Guardar Libro"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}