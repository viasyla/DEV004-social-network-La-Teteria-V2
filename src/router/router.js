/* ********************************************************** */
/* DECLARACION DE FUNCION ONNAVIGATE QUE REALIZA EL CAMINO DE LAS RUTAS DEL SPA 
LUEGO LAS LLAMO EN LOS ARCHIVOS JS COMO IMPORTACION */


const ROUTES = {};

export const onNavigate = (pathname) => {
  const path = typeof ROUTES[pathname] !== 'function' ? pathname : '/';
  window.history.pushState({}, path, window.location.origin + pathname);
  const rootSection = document.getElementById('root');
  rootSection.innerHTML = '';
  rootSection.append(ROUTES[pathname]());
};

export const addRoutes = (routes) => {
  Object.keys(routes).reduce((currentRoutes, pathname) => {
    currentRoutes[pathname] = routes[pathname];
    return currentRoutes;
  }, ROUTES);
};