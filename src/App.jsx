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


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Header />
      <main className="container mt-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* --- RUTAS DE LIBROS --- */}
          {/* publicas */}
          <Route path="/libros" element={<LibroList />} />
          <Route path="/libros/:id" element={<LibroDetail />} />
          
          {/* privadas */}
          <Route path="/libros/new" element={<ProtectedRoute><LibroForm /></ProtectedRoute>} />
          <Route path="/libros/edit/:id" element={<ProtectedRoute><LibroForm /></ProtectedRoute>} />


          {/* --- RUTAS DE AUTORES --- */}
          {/* publicas */}
          <Route path="/autores" element={<AutorList />} />
          <Route path="/autores/:id" element={<AutorDetail />} />
          
          {/* privadas */}
          <Route path="/autores/new" element={<ProtectedRoute><AutorForm /></ProtectedRoute>} />
          <Route path="/autores/edit/:id" element={<ProtectedRoute><AutorForm /></ProtectedRoute>} />

          {/*  */}
          <Route path="/" element={<Navigate to="/libros" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;