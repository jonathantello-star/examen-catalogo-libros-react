import React from "react";
import { Card, CardActions, CardMedia, CardContent, Typography, Stack, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './AutorCard.css'; 

export default function AutorCard({ autor, onDelete, onEdit, onView }) {
  
  const mediaUrl = import.meta.env.VITE_MEDIA_URL || 'http://localhost:8000';
  const isLoggedIn = !!localStorage.getItem("access_token");
  
  // imagen del autor
  const imageUrl = autor.foto 
    ? `${mediaUrl}/${autor.foto}` 
    : "https://via.placeholder.com/200x300?text=Sin+Foto";

  return (
    <Card className="autor-card">
      <CardMedia 
        component="img" 
        height={220} 
        image={imageUrl} 
        alt={`${autor.nombre} ${autor.apellido}`} 
        sx={{ objectFit: 'contain', p: 1, bgcolor: '#f5f5f5' }}
      />
      <CardContent className="autor-card-content">
        <Typography variant="h6" className="autor-card-title" noWrap>
          {autor.nombre} {autor.apellido}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Nacionalidad:</strong> {autor.nacionalidad}
        </Typography>
        {}
      </CardContent>

      <CardActions className="autor-card-actions">
        <Stack direction="row" spacing={1}>
          <IconButton 
            onClick={() => onView(autor.id)} 
            className="btn-square btn-view"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>

          {isLoggedIn && (
            <>
              <IconButton 
                onClick={() => onEdit(autor.id)} 
                className="btn-square btn-edit"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => onDelete(autor.id)} 
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