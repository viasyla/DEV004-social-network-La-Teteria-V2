// Este es el punto de entrada de tu aplicacion


import { addRoutes, onNavigate } from './router/router.js';
import { home } from './pages/home.js';
import { registro } from './pages/registro.js';
import { login } from './pages/login.js';
import { wall } from './pages/muro.js'; // traigo la variable wall desde muro.js en la funcion flecha

addRoutes({
  '/': home,
  '/registro': registro,
  '/login': login,
  '/muro': wall, // wall01 es la var declarada en wall.js, se agrega en la importacion y en esta declaracion
});

// sirve para cambiar la URL de la web
// Lógica de la aplicacion
window.onload = () => {
  onNavigate(window.location.pathname);
};

// onpopstate se activa automaticamente por el navegador al navegar por entre los estados del historial
//Este evento es importante para manejar cuando se empuja a objeto de la historia y más tarde recuperar la 
// información cada  vez que el usuario pulsa el botón atrás / adelante del navegador.
window.onpopstate = () => {
  onNavigate(window.location.pathname);
};

