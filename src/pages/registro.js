import { onNavigate } from '../router/router.js';
import { btnVolverHome, btnRegistro, validarEmail, validarClave } from "../componentes/funciones.js";

import { registrarUsuario  } from "../firebase/firebase-funcion";
import { AuthErrorCodes, EmailAuthCredential } from 'firebase/auth';
import { async } from 'regenerator-runtime';




export const registro = () => {
  // console.log("cargando registro");
  

  /* *** DECLARACION DE VARIABLES *** */
  // -------------------
  //IMPORTANTE = leer comentario de querySelector
  document.querySelector('body').classList.add('registro__body', 'registro__todo-body');//creo una clase al body, lo que me permite colocar imagenes separadas a cada pagina como registrer/home/etc, se debe crear en cada una de las paginas
  document.querySelector('body').classList.remove('home__body');//aqui elimino la clase registro__header para que cambie por home__header
  document.querySelector('body').classList.remove('login__body','login__todo-body');//aqui elimino la clase registro__header para que cambie por home__header
  
  document.querySelector('header').classList.add('registro__header');//creo la clase registro__header
  document.querySelector('header').classList.remove('home__header');//aqui elimino la clase home__header que la traigo como herencia de home
  document.querySelector('header').classList.remove('login__header');//aqui elimino la clase registro__header para que cambie por home__header

  document.querySelector('footer').classList.add('registro__footer')
  document.querySelector('footer').classList.remove('home__footer');//aqui elimino la clase registro__header para que cambie por home__header
  document.querySelector('footer').classList.remove('login__footer');//aqui elimino la clase registro__header para que cambie por home__header
  
  
  //------- Seccion Contenedor principal
  const section = document.createElement('section');
  section.classList.add('registro-container');

  //------- Creacion Titulo Registro (H1) 
  const titulo = document.createElement('h1');
  titulo.textContent = 'Registro.';
  titulo.classList.add('registro__titulo');

  /* ------ Creacion Input NOMBRE/APODO */
  const inputUsuario = document.createElement('input');
  inputUsuario.setAttribute('type','text');
  inputUsuario.setAttribute('id','input-Usuario');
  inputUsuario.classList.add('registro-inputs');
  
  const inputUsuarioLabel = document.createElement('label');
  inputUsuarioLabel.textContent='Usuario/Nombre';
  inputUsuarioLabel.classList.add('registro-label', 'registro-label-usuario');

  const inputUsuarioLabel2 = document.createElement('label');
  inputUsuarioLabel2.textContent='*Solo texto y guion medio. Ej. Maria-Consuelo';
  inputUsuarioLabel2.classList.add('registro-label-indicaciones');

  inputUsuarioLabel.append(inputUsuario,inputUsuarioLabel2);
  
  /* ------ Creacion Input EMAIL */
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('id','input-Email');
  inputEmail.classList.add('registro-inputs');

  const inputEmailLabel = document.createElement('label');
  inputEmailLabel.textContent='Mail';
  inputEmailLabel.classList.add('registro-label');
  
  const inputEmailLabel2 = document.createElement('label');
  inputEmailLabel2.textContent='*Sin espacios, ej: micorreo@micorreo.com';
  inputEmailLabel2.classList.add('registro-label-indicaciones');

  inputEmailLabel.append(inputEmail,inputEmailLabel2);

  /* ------ Creacion Input PASSWORD */
  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('id','input-Password');
  inputPassword.classList.add('registro-inputs');/* ('registro-inputs','alfa') para agregar mas de 1 clase*/ 
  
  const inputPasswordLabel = document.createElement('label');
  inputPasswordLabel.textContent='Clave';
  inputPasswordLabel.classList.add('registro-label');

  const inputPasswordLabel2 = document.createElement('label');
  inputPasswordLabel2.textContent='*De  6-10  caracteres  (numeros y letras),  1   mayusc., 1 signo, Sin espacios';
  inputPasswordLabel2.classList.add('registro-label-indicaciones');

  inputPasswordLabel.append(inputPassword,inputPasswordLabel2);

  /* ------ Creacion Input REPETICION DE PASSWORD */
  const inputPasswordRepeticion = document.createElement('input');
  inputPasswordRepeticion.setAttribute('type', 'password');
  inputPasswordRepeticion.setAttribute('id','input-Password-Repeticion');
  inputPasswordRepeticion.classList.add('registro-inputs');

  const inputPasswordRepeticionLabel = document.createElement('label');
  inputPasswordRepeticionLabel.textContent='Repetir Clave';
  inputPasswordRepeticionLabel.classList.add('registro-label');

  inputPasswordRepeticionLabel.append(inputPasswordRepeticion);
  /* ------ Llamada Boton Registrarse */
  const botonRegistrandose = btnRegistro();
  botonRegistrandose.classList.add('botonRegistrandose');

  /* ------ Llamada boton Volver al Home */
  const botonVolverHome = btnVolverHome();
  botonVolverHome.classList.add('botonVolverHome1');

 
 
  // FUNCIONES AddEventListener 
  
  botonRegistrandose.addEventListener('click', async () => {
    console.log("boton registro");
     // llama funcion navigate y pasa string con la ruta
     // onNavigate('/muro');
    const ingresoMail = inputEmail.value;
    // console.log(ingresoMail);
    const ingresoClaveMail = inputPassword.value;
    // validarRegistro();
    if (validarRegistro() === true) {
      registrarUsuario(ingresoMail,ingresoClaveMail);
    }
  });//Final de listener boronRegistandose


  botonVolverHome.addEventListener('click', () => {
    // llama funcion navigate y pasa string con la ruta
    onNavigate('/');
  });

  // suman elementos a contenedor madre
  // section.append(inputApodo/*,inputApodoLabel*/,inputEmail,inputEmailLabel, inputPassword,inputPasswordLabel, inputPasswordRepeticion,inputPasswordRepeticionLabel, botonRegistrandose, botonVolverHome);

   section.append( titulo,inputUsuarioLabel,inputEmailLabel,inputPasswordLabel,inputPasswordRepeticionLabel,botonRegistrandose,botonVolverHome );

  // retorna contenedor madre
  return section;
};

/* VERIFICAR en DATOS VALIDADOS
-APODO = SOLO TEXTO
-MAIL  = SOLO TEXTO,NUMEROS,GUIONES,ARROBA,PUNTO
-CLAVE = No puede tener espacios, De 6-10 caracteres,1 mayuscula,1 signo
*/
function validarRegistro() {
  const usuario = document.getElementById('input-Usuario').value;
  const mail = document.getElementById('input-Email').value;
  const clave = document.getElementById('input-Password').value;
  const claveRepeticion = document.getElementById('input-Password-Repeticion').value;

  const usuarioValid = /^[A-Za-z-]+$/g.test(usuario);
  console.log('validacion usuario :', usuarioValid );
  //TODO:¨mejorar aspecto visual
  if (usuarioValid === false) {
    alert('El Usuario solo debe contener letras y/o guión ( - ).');
    return false;
  }

  if (validarEmail(mail) === false) {
    // alert("Email no es valido. "+ mail);
    return false;
  }

  if (validarClave(clave) === false) {
    // console.log('la clave infresada es : ', clave);
    // const expresionRegular2=validarClave(clave.value);
    // alert ('expresion regular2 ', expresionRegular2);
    // alert('Clave no cumple con los requisitos.');

    return false;
  }

  if ((clave === claveRepeticion) === false) {
    // console.log('la clave infresada es : ', clave);
    // console.log('la REclave infresada es : ', claveRepeticion);
    alert('Las claves no coinciden.');
    return false
  }

  if (usuario===''|| mail ===''|| clave===''||claveRepeticion==='') {
    alert('Campos vacios, favor revisar.');
    return false;
  }


 
 
  return true;
}