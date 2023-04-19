import { onNavigate } from '../router/router';
import { btnVolverHome, btnRegistro } from "../componentes/funciones";

import { registrarUsuario  } from "../firebase/firebase-funcion";
import { AuthErrorCodes, EmailAuthCredential } from 'firebase/auth';
import { async } from 'regenerator-runtime';




export const registro = () => {
  console.log("cargando registro");
  

  /* *** DECLARACION DE VARIABLES *** */
  // -------------------
  //IMPORTANTE = leer comentario de querySelector
  document.querySelector('body').classList.add('registro__body', 'todo-body');//creo una clase al body, lo que me permite colocar imagenes separadas a cada pagina como registrer/home/etc, se debe crear en cada una de las paginas
  document.querySelector('header').classList.add('registro__header');
  document.querySelector('footer').classList.add('registro__footer')


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
  inputUsuarioLabel2.textContent='*Solo texto';
  inputUsuarioLabel2.classList.add('registro-label-indicaciones');

  // inputApodo.append(inputApodoLabel,inputApodoLabel2); ****NO ME PERMITE INCLUIRLOS JUNTOS NI CON APPEND O APPENDcHILD PREGUNTA A GENESIS


  /* ------ Creacion Input EMAIL */
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('id','input-Email');
  inputEmail.classList.add('registro-inputs');

  const inputEmailLabel = document.createElement('label');
  inputEmailLabel.textContent='Mail';
  inputEmailLabel.classList.add('registro-label');
  
  const inputEmailLabel2 = document.createElement('label');
  inputEmailLabel2.textContent='*Sin espacios';
  inputEmailLabel2.classList.add('registro-label-indicaciones');
  
  /* ------ Creacion Input PASSWORD */
  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('id','input-Password');
  inputPassword.classList.add('registro-inputs');/* ('registro-inputs','alfa') para agregar mas de 1 clase*/ 
  
  const inputPasswordLabel = document.createElement('label');
  inputPasswordLabel.textContent='Clave';
  inputPasswordLabel.classList.add('registro-label');

  const inputPasswordLabel2 = document.createElement('label');
  inputPasswordLabel2.textContent='*De 6-10 caracteres(numeros y letras), 1 mayusc., 1 signo, Sin espacios';
  inputPasswordLabel2.classList.add('registro-label-indicaciones');

  /* ------ Creacion Input REPETICION DE PASSWORD */
  const inputPasswordRepeticion = document.createElement('input');
  inputPasswordRepeticion.setAttribute('type', 'password');
  inputPasswordRepeticion.setAttribute('id','input-Password-Repeticion');
  inputPasswordRepeticion.classList.add('registro-inputs');

  const inputPasswordRepeticionLabel = document.createElement('label');
  inputPasswordRepeticionLabel.textContent='Repetir Clave';
  inputPasswordRepeticionLabel.classList.add('registro-label');

  /* ------ Llamada Boton Registrarse */
  const botonRegistrandose = btnRegistro();
  botonRegistrandose.classList.add('botonRegistrandose');

  /* ------ Llamada boton Volver al Home */
  const botonVolverHome = btnVolverHome();
  botonVolverHome.classList.add('botonVolverHome');

 
 
  // FUNCIONES AddEventListener 
  
botonRegistrandose.addEventListener('click', async () => {
  console.log("boton registro");
  // llama funcion navigate y pasa string con la ruta
  // onNavigate('/muro');
  const ingresoMail = inputEmail.value;
  // console.log(ingresoMail);

  const ingresoClaveMail = inputPassword.value;

  validarRegistro();

  
  try {
    if (validarRegistro() === true){ 
      // console.log(error);

     registrarUsuario(ingresoMail,ingresoClaveMail)
     onNavigate('/muro');
    };
  } catch (error) { 
    console.log('hubo un error llamar registro', error);
  }      
});


  botonVolverHome.addEventListener('click', () => {
    // llama funcion navigate y pasa string con la ruta
    onNavigate('/');
  });

  // suman elementos a contenedor madre
  // section.append(inputApodo/*,inputApodoLabel*/,inputEmail,inputEmailLabel, inputPassword,inputPasswordLabel, inputPasswordRepeticion,inputPasswordRepeticionLabel, botonRegistrandose, botonVolverHome);

   section.append(titulo, inputUsuarioLabel,inputUsuario,inputUsuarioLabel2, inputEmailLabel,inputEmail,inputEmailLabel2,  inputPasswordLabel,inputPassword,inputPasswordLabel2, inputPasswordRepeticionLabel,inputPasswordRepeticion, botonRegistrandose, botonVolverHome);

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
  // console.log(ingresoApodo);

  const mail = document.getElementById('input-Email').value;

  const clave = document.getElementById('input-Password').value;
  // console.log(ingresoClaveMail);
  const claveRepeticion = document.getElementById('input-Password-Repeticion').value;
  const usuarioValid = /[0-9]/g.test(usuario);
  const validarCorreo = /^[a-zA-Z0-9.!#$%&'*+/=?^_-`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(mail);
  const validarClave = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-+=?/])(?=.*[0-9])(?!.*\s).{6,10}$/g.test(clave);
 
  //TODO:¨mejorar aspecto visual
  if (usuarioValid === true) {
    alert('El Usuario solo debe contener letras.');
    return false;
  }

  if (usuario===''|| mail ===''|| clave===''||claveRepeticion==='') {
    alert('Campos vacios, favor revisar.');
    return false;
  }

  if (validarCorreo === false) {
    alert("Email no es valido.");
    return false;
  }

  if (validarClave === false) {
    return alert('Las claves no coinciden.');
  }

  return true;
}