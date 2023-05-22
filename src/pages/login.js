import { onNavigate } from '../router/router';
import { validarEmail,validarClave,btnLogin,btnVolverHome,btnGoogle,btnFacebook } from '../componentes/funciones.js';

import { ValidarIngresoUsuario,validarConGoogle  } from "../firebase/firebase-funcion";
import { documentId } from 'firebase/firestore';



export const login = () => {
  /* *** DECLARACION DE VARIABLES *** */
  // -------------------
  //IMPORTANTE = leer comentario de querySelector
  document.querySelector('body').classList.add('login__body', 'login__todo-body');//creo una clase al body, lo que me permite colocar imagenes separadas a cada pagina como registrer/home/etc, se debe crear en cada una de las paginas
  document.querySelector('body').classList.remove('home__body');//creo la clase registro__header
  document.querySelector('body').classList.remove('registro__body', 'registro__todo-body');//creo la clase registro__header
 
 
  document.querySelector('header').classList.add('login__header');//creo la clase registro__header
  document.querySelector('header').classList.remove('home__header');//aqui elimino la clase home__header que la traigo como herencia de home
  document.querySelector('header').classList.remove('registro__header');//aqui elimino la clase home__header que la traigo como herencia de home
 
  document.querySelector('footer').classList.add('login__footer')
  document.querySelector('footer').classList.remove('home__footer');//aqui elimino la clase home__header que la traigo como herencia de home
  document.querySelector('footer').classList.remove('registro__footer');//aqui elimino la clase home__header que la traigo como herencia de home

  //------- Seccion Contenedor principal
  const section = document.createElement('section');
  section.classList.add('login-container');

  //------- Creacion Titulo Registro (H1) 
  const titulo = document.createElement('h1');
  titulo.textContent = 'Login.';
  titulo.classList.add('login__titulo');

  /* ------ Creacion Input EMAIL */
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('id','input-Email');
  inputEmail.classList.add('login-inputs');

  const inputEmailLabel = document.createElement('label');
  inputEmailLabel.textContent='Mail';
  inputEmailLabel.classList.add('login-label');
  
  const inputEmailLabel2 = document.createElement('label');
  inputEmailLabel2.textContent='*Sin espacios, ej: micorreo@micorreo.com';
  inputEmailLabel2.classList.add('login-label-indicaciones');

  inputEmailLabel.append(inputEmail,inputEmailLabel2);

  /* ------ Creacion Input PASSWORD */
  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('id','input-Password');
  inputPassword.classList.add('login-inputs');/* ('login-inputs','alfa') para agregar mas de 1 clase*/ 
  
  const inputPasswordLabel = document.createElement('label');
  inputPasswordLabel.textContent='Clave';
  inputPasswordLabel.classList.add('login-label');

  const inputPasswordLabel2 = document.createElement('label');
  inputPasswordLabel2.textContent='*De  6-10  caracteres  (numeros y letras),  1   mayusc., 1 signo, Sin espacios';
  inputPasswordLabel2.classList.add('login-label-indicaciones');

  inputPasswordLabel.append(inputPassword,inputPasswordLabel2);

  /* ------ Llamada Boton Loguin */
  const botonLogin = btnLogin();
  botonLogin.classList.add('botonLogin-login');  
  
  /* ------ Llamada boton Volver al Home */
  const botonVolverHome = btnVolverHome();
  botonVolverHome.classList.add('botonVolverHome');

  // /* ------ Boton Iniciar con Google */
  // const imagenGoogle = document.createElement('img');
  // imagenGoogle.setAttribute('id','google');
  // imagenGoogle.src = './imagenes/btn-google-pressed-web2x.png';

const separador = document.createElement('p');
separador.classList.add('separador-sesiones-disponibles');
separador.textContent = ('------------ Ó Inicia con ----------');



  /* ------ Boton Iniciar con Google */

const botonGoogle = btnGoogle();
botonGoogle.classList.add('login-botonGoogle');

botonGoogle.addEventListener('click',() => {
  console.log('estoy haciendo click en boton google');
  validarConGoogle();
})
  /* ------ Boton Iniciar con Facebook */
  const botonFacebook = btnFacebook();
  botonFacebook.classList.add('login-botonFacebook');
  
  botonFacebook.addEventListener('click',() => {
    console.log('estoy haciendo click en boton Facebook');
    validarConFacebook();
  })


  // const divGoogle =document.createElement('div');
  // divGoogle.classList.add('login__divGoogle');
  // const imagenGoogle = document.createElement('img');
  // imagenGoogle.setAttribute('id','google');
  // imagenGoogle.src = './imagenes/btn-google-pressed-web2x.png';
  // divGoogle.append(imagenGoogle);


  

/**** FUNCIONES AddEventListener ********************************************/ 
   
  /* CLICK BOTON LOGIN */
  botonLogin.addEventListener('click', async () => {
    console.log("boton Login");
     // llama funcion navigate y pasa string con la ruta
     // onNavigate('/muro');
    const ingresoMail = inputEmail.value;
    // console.log(ingresoMail);
    const ingresoClaveMail = inputPassword.value;
    // validarRegistro();
    if (validarLogin() === true) {
      ValidarIngresoUsuario(ingresoMail,ingresoClaveMail);
    }
  });//Final de listener boronRegistandose

   /* CLICK BOTON VOLVER AL HOME */
  botonVolverHome.addEventListener('click', () => {
    onNavigate('/');
  });

  // suman elementos a contenedor madre
  // section.append(inputApodo/*,inputApodoLabel*/,inputEmail,inputEmailLabel, inputPassword,inputPasswordLabel, inputPasswordRepeticion,inputPasswordRepeticionLabel, botonRegistrandose, botonVolverHome);

   section.append( titulo,inputEmailLabel,inputPasswordLabel,botonLogin,separador,botonGoogle, botonFacebook/*divGoogle,/*imagenGoogle*/,botonVolverHome );

  // retorna contenedor madre
  return section;
  };

  function validarLogin() {
    const mail = document.getElementById('input-Email').value;
    const clave = document.getElementById('input-Password').value;
  
    //TODO:¨mejorar aspecto visual
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
  
    if (mail ===''|| clave ==='') {
      alert('Campos vacios, favor revisar.');
      return false;
    }
    return true;
  }