import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


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


export async function fetchAutores() {
  const response = await axios.get(`${API_BASE_URL}/autores/`);
  return response.data;
}

export async function fetchLibros() {
  const response = await axios.get(`${API_BASE_URL}/libros/`);
  return response.data;
}

export async function fetchLibroById(id) {
  const response = await axios.get(`${API_BASE_URL}/libros/${id}/`);
  return response.data;
}

export async function addLibro(libroData) {
  let portadaBase64 = "";
  if (libroData.portada) {
    portadaBase64 = await fileToBase64(libroData.portada);
  }
  const payload = { ...libroData, portada: portadaBase64 };
  const response = await axios.post(`${API_BASE_URL}/libros/`, payload);
  return response.data;
}

export async function updateLibro(id, libroData) {
  let payload = { ...libroData };
  if (libroData.portada && typeof libroData.portada !== "string") {
    payload.portada = await fileToBase64(libroData.portada);
  }
  const response = await axios.put(`${API_BASE_URL}/libros/${id}/`, payload);
  return response.data;
}

export async function deleteLibro(id) {
  const response = await axios.delete(`${API_BASE_URL}/libros/${id}/`);
  return response.data;
}