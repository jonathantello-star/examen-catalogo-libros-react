import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";


axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Obtener lista de autores
export async function fetchAutores() {
  const response = await axios.get(`${API_BASE_URL}/autores/`);
  return response.data;
}

// Obtener un autor por ID
export async function fetchAutorById(id) {
  const response = await axios.get(`${API_BASE_URL}/autores/${id}/`);
  return response.data;
}

// Crear Autor
export async function addAutor(autorData) {
  let fotoBase64 = "";
  
  if (autorData.foto) {
    fotoBase64 = await fileToBase64(autorData.foto);
  }
  
  const payload = { ...autorData, foto: fotoBase64 };
  
  const response = await axios.post(`${API_BASE_URL}/autores/`, payload);
  return response.data;
}

// Editar Autor
export async function updateAutor(id, autorData) {
  let payload = { ...autorData };
  
  
  
  if (autorData.foto && typeof autorData.foto !== "string") {
    payload.foto = await fileToBase64(autorData.foto);
  }
  
  const response = await axios.put(`${API_BASE_URL}/autores/${id}/`, payload);
  return response.data;
}

// Eliminar Autor
export async function deleteAutor(id) {
  const response = await axios.delete(`${API_BASE_URL}/autores/${id}/`);
  return response.data;
}