import React from "react";
import { Card, CardActions, CardMedia, CardContent, Typography, Stack, IconButton, Box } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './LibroCard.css'; 

export default function LibroCard({ libro, onDelete, onEdit, onView }) {
  const mediaUrl = import.meta.env.VITE_MEDIA_URL || 'http://localhost:8000';
  const isLoggedIn = !!localStorage.getItem("access_token");
  
  const imageUrl = libro.portada 
    ? `${mediaUrl}/${libro.portada}` 
    : "https://via.placeholder.com/200x300?text=Sin+Portada";

  

  return (
    <Card className="libro-card">
      <CardMedia 
        component="img" 
        height={220} 
        image={imageUrl} 
        alt={libro.titulo} 
        sx={{ objectFit: 'contain', p: 1, bgcolor: '#f5f5f5' }}
      />
      <CardContent className="libro-card-content">
        <Typography variant="h6" className="libro-card-title" noWrap>
          {libro.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Género:</strong> {libro.genero}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Año:</strong> {libro.fecha_publicacion}
        </Typography>
      </CardContent>

      <CardActions className="libro-card-actions">
        <Stack direction="row" spacing={1}>
          <IconButton 
            onClick={() => onView(libro.id)} 
            className="btn-square btn-view"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>

          {isLoggedIn && (
            <>
              <IconButton 
                onClick={() => onEdit(libro.id)} 
                className="btn-square btn-edit"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => onDelete(libro.id)} 
                className="btn-square btn-delete"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}