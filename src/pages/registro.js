import { onNavigate } from '../router/router';
import { btnVolverHome, btnRegistro } from "../componentes/funciones";

import { registrarUsuario  } from "../firebase/firebase-funcion";




export const registro = () => {
  

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
  const inputApodo = document.createElement('input');
  inputApodo.setAttribute('type','text');
  inputApodo.setAttribute('id','input-Apodo');
  inputApodo.classList.add('registro-inputs');
  
  const inputApodoLabel = document.createElement('label');
  inputApodoLabel.textContent='Apodo/Nombre';
  inputApodoLabel.classList.add('registro-label', 'registro-label-apodo');

  const inputApodoLabel2 = document.createElement('label');
  inputApodoLabel2.textContent='*Solo texto';
  inputApodoLabel2.classList.add('registro-label-indicaciones');

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
  inputPasswordLabel2.textContent='*De 6-8 caracteres, 1 mayusc., 1 signo, Sin espacios';
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

 
 /* ------ Funcion para fijar la posicion del LABEL al rellenar el campo */
 
 
//  export let fijar=() => {
//   // document.getElementsByClassName('registro-label');
//   document.querySelectorAll('registro-label');

//  for (let i = 0; i < fijar.length; i++) {
//    fijar[i].addEventListener('keyup', function () {
//      if (this.value.length >= 1) {
//        this.nextElementSibling.classList.add('fijar');        
//      } else {
//        this.nextElementSibling.classList.remove('fijar');        
//      }
//    });
//  }}

// ó Esta funcion !
//   let fijar=document.getElementsByClassName('registro-label');
//   console.log(fijar);
//    for (let i = 0; i < fijar.length; i++) {
//      fijar[i].addEventListener('keyup', function () {
//       console.log(fijar[i]);
//        if (this.value.length >= 1) {
//          this.nextElementSibling.classList.add('fijar');        
//        } else {
//          this.nextElementSibling.classList.remove('fijar');        
//        }
//      })
//    };
// let fijar1=fijar();
//    addEventListener('keyup', function (fijar1) {
    
//    })


  // FUNCIONES AddEventListener 
  
  botonRegistrandose.addEventListener('click', () => {
    // llama funcion navigate y pasa string con la ruta
    // onNavigate('/muro');
    const ingresoMail = inputEmail.value;
    // console.log(ingresoMail);

    const ingresoClaveMail = inputPassword.value;

    datosValidados();
    if (datosValidados() === true){
      registrarUsuario(ingresoMail,ingresoClaveMail)
      //console.log(registrarUsuario(ingresoMail,ingresoClaveMail));
      onNavigate('/muro');


    }
    
  });


  botonVolverHome.addEventListener('click', () => {
    // llama funcion navigate y pasa string con la ruta
    onNavigate('/');
  });

  // let fijar1 = fijar();
  // suman elementos a contenedor madre
  // section.append(inputApodo/*,inputApodoLabel*/,inputEmail,inputEmailLabel, inputPassword,inputPasswordLabel, inputPasswordRepeticion,inputPasswordRepeticionLabel, botonRegistrandose, botonVolverHome);

   section.append(titulo, inputApodoLabel,inputApodo,inputApodoLabel2, inputEmailLabel,inputEmail,inputEmailLabel2,  inputPasswordLabel,inputPassword,inputPasswordLabel2, inputPasswordRepeticionLabel,inputPasswordRepeticion, botonRegistrandose, botonVolverHome);




  // retorna contenedor madre
  return section;
};

/* VERIFICAR en DATOS VALIDADOS
-APODO = SOLO TEXTO
-MAIL  = SOLO TEXTO,NUMEROS,GUIONES,ARROBA,PUNTO
-CLAVE = No puede tener espacios, De 6-8 caracteres,1 mayuscula,1 signo
*/
function datosValidados() {
  const ingresoApodo = document.getElementById('input-Apodo').value;
  const ingresoMail = document.getElementById('input-Email').value;
  // console.log(ingresoMail);
  const ingresoClave = document.getElementById('input-Password').value;
  // console.log(ingresoClaveMail);
  const ingresoClaveRepeticion = document.getElementById('input-Password-Repeticion').value;

  if (ingresoApodo===''|| ingresoMail ===''|| ingresoClave===''||ingresoClaveRepeticion==='') {
    alert('Campos vacios, favor revisar.');
    return false;
  }

  // if (ingresoClaveMail ==='') {
  //   alert('Ingrese Clave.');
  //   return false;
  // }
  return true;
}