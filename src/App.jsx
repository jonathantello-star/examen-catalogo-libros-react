import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import LibroList from "./pages/LibroList";
import LibroForm from "./pages/LibroForm";
import AutorList from "./pages/AutorList";
import AutorForm from "./pages/AutorForm";
import LibroDetail from "./pages/LibroDetail";
import AutorDetail from "./pages/AutorDetail"; 
import "./App.css";

function App() {
  // Verificamos si hay un token. Si no hay mandamos al login
  const isAuthenticated = !!localStorage.getItem("access_token");

  return (
    <Router>
      <Header />
      <main className="container mt-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas de Libros */}
          <Route path="/libros" element={isAuthenticated ? <LibroList /> : <Navigate to="/login" />} />
          <Route path="/libros/new" element={isAuthenticated ? <LibroForm /> : <Navigate to="/login" />} />
          <Route path="/libros/edit/:id" element={isAuthenticated ? <LibroForm /> : <Navigate to="/login" />} />
          <Route path="/libros/:id" element={isAuthenticated ? <LibroDetail /> : <Navigate to="/login" />} />

          {/* Rutas de Autores */}
          <Route path="/autores" element={isAuthenticated ? <AutorList /> : <Navigate to="/login" />} />
          <Route path="/autores/new" element={isAuthenticated ? <AutorForm /> : <Navigate to="/login" />} />
          <Route path="/autores/edit/:id" element={isAuthenticated ? <AutorForm /> : <Navigate to="/login" />} />
          {/* 2. IMPORTANTE: Agregué esta ruta para que funcione el botón del "Ojo" */}
          <Route path="/autores/:id" element={isAuthenticated ? <AutorDetail /> : <Navigate to="/login" />} />

          {/* eedireccion automatica */}
          <Route path="/" element={<Navigate to="/libros" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;