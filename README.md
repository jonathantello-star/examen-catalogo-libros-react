# React: Catálogo de Libros

## Descripción General
Este repositorio contiene el desarrollo del proyecto final para construir una aplicación de gestión de libros usando React, Material UI y consumo de APIs REST desarrolladas en Django.

## Información del Estudiante
**Nombre:** Jonathan Mateo Tello Alvarez
**Asignatura:** Desarrollo de Aplicaciones Web

---

## Examen Final: Catálogo de Libros y Autores

### Objetivo
Desarrollar un sistema frontend   que permita la gestión de un catálogo literario. La aplicación consume una API REST protegida, gestiona la autenticación de usuarios y permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre Autores y Libros.

### Requisitos técnicos implementados
- **React + Vite:** Estructura base del proyecto.
- **Material UI:** Diseño de interfaces, formularios y componentes visuales.
- **Axios:** Gestión de peticiones HTTP (GET, POST, PUT, DELETE).
- **React Router:** Navegación y protección de rutas privadas.
- **OAuth2:** Sistema de autenticación con tokens.

### Funcionalidades Principales
1. **Autenticación:**
   - Login con credenciales de usuario.
   - Logout y limpieza de tokens.
   - Protección de rutas (solo usuarios logueados pueden ver el catálogo).

2. **Gestión de Autores:**
   - Visualización de lista de autores.
   - Creación y Edición de autores con foto.
   - Inclusión de detalles completos: Fecha de nacimiento, Género literario y Biografía.
   - Eliminación de autores.

3. **Gestión de Libros:**
   - Visualización de lista de libros con sus portadas.
   - Asociación de libros a autores existentes.
   - Inclusión de resumen detallado del libro.
   - Creación, Edición y Eliminación de libros.

### Estructura del proyecto
```
/src
  /assets
    libreria-logo.png
  /components
    Header.jsx
    AutorCard.jsx
    LibroCard.jsx
    Spinner.jsx
  /pages
    App.jsx
    LoginPage.jsx
    AutorList.jsx
    AutorForm.jsx
    AutorDetail.jsx
    LibroList.jsx
    LibroForm.jsx
    LibroDetail.jsx
  /services
    authService.js
    autorService.js
    libroService.js
  .env
  main.jsx
```

### Variables de entorno (.env)
```
VITE_API_BASE_URL=http://localhost:8000
VITE_API_MEDIA_URL=${VITE_API_BASE_URL}/media/
VITE_API_CLIENT_ID=tu_client_id
VITE_API_CLIENT_SECRET=tu_client_secret
```

---

## Instalación del proyecto

1. **Clonar el repositorio** 
2. Abrir en VS Code la carpeta de tu repositorio clonado
3. Instalar las dependencias base:
   ```bash
   npm install
   ```
4. Instalar Material UI y sus dependencias:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   ```
5. Instalar Axios (necesario desde Laboratorio 10):
   ```bash
   npm install axios
   ```
6. Instalar React Router (necesario desde Laboratorio 11):
   ```bash
   npm install react-router-dom
   ```

### Comandos útiles
- Ejecutar el servidor de desarrollo
    ```bash
    npm run dev
    ```
- Comprobar versión de dependencias
    ```bash
    npm list
    ```
- Limpiar dependencias
    ```bash
    rm -rf node_modules
    npm install
    ```

### Comandos git
- Verificar los archivos modificados
    ```bash
    git status
    ```
- Agregar archivos al área de preparación
    ```bash
    git add .
    ```
- Realizar un commit
    ```bash
    git commit -m "Examen Final: completado"
    ```
- Enviar los cambios a github
    ```bash
    git push
    ```
