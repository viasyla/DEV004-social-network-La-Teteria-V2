/* ********************************************************** */
/* DECLARACION DE FUNCIONES QUE LAS LLAMO LUEGO EN LOS ARCHIVOS JS COMO IMPORTACION */

export const btnRegistro =() =>{
  const botonRegistro = document.createElement('button');
  botonRegistro.textContent = 'Registrarse';
  return botonRegistro;
}
export const btnLogin =() =>{
  const botonLogin = document.createElement('button');
  botonLogin.textContent = 'Iniciar Sesión';
  return botonLogin;
}

export const btnVolverHome =() =>{
  const botonVolverHome = document.createElement('button');
  botonVolverHome.textContent = ' Volver al Inicio';
  return botonVolverHome;
}
