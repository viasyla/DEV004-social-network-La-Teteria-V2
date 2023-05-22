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
export const btnLogout =() =>{
  const botonSalir = document.createElement('button');
  botonSalir.textContent = ' Cerrar Sesion. ';
  return botonSalir;
}

export const btnGoogle =() =>{
  const botonGoogle = document.createElement('button');
  return botonGoogle;
}
export const btnFacebook =() =>{
  const botonFacebook = document.createElement('button');
  return botonFacebook;
}
export  const btnGuardarPost=() =>{
  const botonGuardar = document.createElement('button');
  // botonGuardar.textContent='Enviar';//guardar y enviar post en Muro
} 

/* ****************************************** */

export function validarEmail(email) {
  const expresionRegular = /^[^\s@]+@[^\s@]+\.(com|cl)$/;
  if (/\s/.test(email)) {
    // devuelve falso si el correo electrónico contiene un espacio en blanco
    alert("El correo electrónico no puede contener espacios en blanco");
    return false;
  }
  const matches = email.match(/\.com|\.cl/g);
  if (matches) {
    if (matches.length === 1) {
      const index = email.lastIndexOf(matches[0]);
      const domain = email.slice(index);
      const username = email.slice(0, index);
      if (username.includes("@")) {
        return true;
      } else {
        alert("Falta @ en el correo electrónico");
        return false;
      }
    } else {
      alert("El correo electrónico no puede tener dos dominios " + matches.join(", "));
      return false;
    }
  } else {
     alert("El correo electrónico debe tener el dominio .com o .cl");
     return false;
  }
}


/* Explicación de la expresión regular en esta funcion:

^ y $ indican el inicio y fin de la cadena, respectivamente.
[^\s@]+ coincide con uno o más caracteres que no son ni espacios ni arrobas.
@ coincide con la arroba.
[^\s@]+ coincide con uno o más caracteres que no son ni espacios ni arrobas.
\. coincide con el punto literal.
(com|cl) coincide con la cadena "com" o la cadena "cl", en minúsculas o mayúsculas.
En resumen, la expresión regular verifica que la cadena comience con uno o más caracteres que no sean espacios ni arrobas, seguido de una arroba, seguido de uno o más caracteres que no sean espacios ni arrobas, seguido de un punto y la cadena "com" o "cl" al final

para llamar esta función, debo validarEmail y pasándole el valor del campo de correo electrónico con .value. La función devolverá true si el formato es válido y false si no lo es. */


/* ****************************************** */

export function validarClave(clave) {
  const expresionRegular2 = /^(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,10}$/;
  if (clave.length < 6 || clave.length > 10) {
    alert('La clave debe tener entre 6 y 10 caracteres.    Tú tienes '+clave.length+' caracteres.' );
    return false;
  }
  if (clave.includes(' ')) {
    alert('La clave no debe contener espacios');
    return false;
  }
  if (!expresionRegular2.test(clave)) {
    alert('La clave no cumple con los requisitos solicitados*.');
    return false;
  }
  return expresionRegular2.test(clave);

}
// export function validarClave(clave) {
//   var expresionRegular2 = /^(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,10}$/
//   console.log('Funciones.js : regular2  ',expresionRegular2 );
//   return expresionRegular2.test(clave);
// }

//--------CREAR FUNCION DE FECHA
export function mifecha(pfecha) {
  // let fecha = pfecha

  // Supongamos que tenemos un timestamp en milisegundos
// const timestamp = 1620632400000;

// Creamos un nuevo objeto Date utilizando el timestamp
const fecha = new Date(pfecha);

// Obtenemos las partes de la hora
const horas = fecha.getHours();
const minutos = fecha.getMinutes();
const segundos = fecha.getSeconds();

// Puedes ajustar el formato de salida como desees
const horaFormateada = `${horas}:${minutos}:${segundos}`;

console.log(horaFormateada); // Salida: "12:0:0"

}

