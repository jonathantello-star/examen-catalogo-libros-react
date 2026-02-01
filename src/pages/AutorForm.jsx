import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { fetchAutorById, addAutor, updateAutor } from "../services/autorService";
import './AutorForm.css'; 

export default function AutorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    nacionalidad: "",
    fecha_nacimiento: "",
    genero_literario: "",
    biografia: ""
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchAutorById(id).then((data) => {
        setFormData({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          nacionalidad: data.nacionalidad || "",
          fecha_nacimiento: data.fecha_nacimiento || "",
          genero_literario: data.genero_literario || "",
          biografia: data.biografia || ""
        });
      }).catch(console.error);
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const dataToSend = {
      ...formData, 
      foto: file 
    };

    try {
      if (isEdit) {
        await updateAutor(id, dataToSend);
        alert("Autor actualizado correctamente");
      } else {
        await addAutor(dataToSend);
        alert("Autor creado correctamente");
      }
      navigate("/autores");
    } catch (error) {
      console.error("Error al guardar:", error.response?.data || error);
      alert("Error al guardar el autor.");
    }
  };

  return (
    
    <Container maxWidth="sm" className="autor-form-container">
      {/*autor-form-paper */}
      <Paper elevation={3} className="autor-form-paper" sx={{ p: 4, mt: 4, borderRadius: '15px' }}>
        {/*autor-form-title */}
        <Typography variant="h5" className="autor-form-title" mb={3} fontWeight="bold">
          {isEdit ? "Editar Autor" : "Nuevo Autor"}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField 
            label="Nombre" fullWidth margin="normal"
            value={formData.nombre} 
            onChange={(e) => setFormData({...formData, nombre: e.target.value})} 
            required 
          />
          
          <TextField 
            label="Apellido" fullWidth margin="normal"
            value={formData.apellido} 
            onChange={(e) => setFormData({...formData, apellido: e.target.value})} 
            required 
          />

          <TextField 
            label="Nacionalidad" fullWidth margin="normal"
            value={formData.nacionalidad} 
            onChange={(e) => setFormData({...formData, nacionalidad: e.target.value})} 
            required
          />

          {}
          <TextField 
            label="Fecha de Nacimiento"
            type="date"
            fullWidth 
            margin="normal"
            value={formData.fecha_nacimiento}
            onChange={(e) => setFormData({...formData, fecha_nacimiento: e.target.value})}
            InputLabelProps={{ shrink: true }} 
          />

          <TextField 
            label="Género Literario (Ej: Terror)" 
            fullWidth 
            margin="normal"
            value={formData.genero_literario} 
            onChange={(e) => setFormData({...formData, genero_literario: e.target.value})} 
          />

          <TextField 
            label="Biografía Breve" 
            fullWidth 
            margin="normal"
            multiline 
            rows={4}
            value={formData.biografia} 
            onChange={(e) => setFormData({...formData, biografia: e.target.value})} 
          />
          {/* --------------------- */}
          
          {/* autor-upload-area */}
          <Box sx={{ mt: 2, mb: 2 }} className="autor-upload-area">
            {/* autor-upload-caption */}
            <Typography variant="caption" display="block" className="autor-upload-caption">Foto del Autor</Typography>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          </Box>

          {/* btn-autor-submit */}
          <Button type="submit" variant="contained" fullWidth className="btn-autor-submit" sx={{ mt: 2, bgcolor: '#00AEEF' }}>
            {isEdit ? "Actualizar Autor" : "Guardar Autor"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}