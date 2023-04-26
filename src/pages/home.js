import { onNavigate } from '../router/router';
import { btnRegistro, btnLogin } from "../componentes/funciones.js";


export const home = () => { // crea contenedor principal
   

  /* *** DECLARACION DE VARIABLES *** */
  // -------------------
  //IMPORTANTE = leer comentario de querySelector
  
  document.querySelector('body').classList.add('home__body')//creo una clase al body, lo que me permite colocar imagenes separadas a cada pagina como registrer/home/etc, se debe crear en cada una de las paginas
  document.querySelector('body').classList.remove('registro__body');//aqui elimino la clase registro__header para que cambie por home__header
  document.querySelector('body').classList.remove('login__body');//aqui elimino la clase registro__header para que cambie por home__header
  
  document.querySelector('header').classList.add('home__header');//creo la clase home__header
  document.querySelector('header').classList.remove('registro__header');//aqui elimino la clase registro__header para que cambie por home__header
  document.querySelector('header').classList.remove('login__header');//aqui elimino la clase registro__header para que cambie por home__header
   
  document.querySelector('footer').classList.add('home__footer')
  document.querySelector('footer').classList.remove('registro__footer')
  document.querySelector('footer').classList.remove('login__footer')
 
   //------- Seccion Article Contenedor principal
  const article = document.createElement('article');
  article.classList.add('home__seccionArticulo');
  
  //------- DIV1 y sus child (DIV1,Titulo,imagen1(tetera gde))
  const div1 = document.createElement('div');
  div1.classList.add('home__div1');
  // const titulo = document.createElement('h1');
  // titulo.textContent = 'LA TETERIA';
  // titulo.classList.add('home__div1_titulo');
  const imagen1 = document.createElement('img');
  imagen1.setAttribute('id','imagenTE1');
  // imagen1.src = './imagenes/fondos/te05.png';

  div1.append(/*titulo,*/imagen1);// agrego titulo,imagen1 al div1

  //------- DIV2 y sus child (DIV2,boton registro,boton login)
  const div2 = document.createElement('div');
  div2.classList.add('home__div2');
  const botonRegistro = btnRegistro();
  botonRegistro.classList.add('botonRegistro');
  const botonLogin = btnLogin();
  botonLogin.classList.add('botonLogin');

  div2.append(botonRegistro,botonLogin);//agrego los botones al div2
  //-------

  // añade evento a los botones
  botonRegistro.addEventListener('click', () => {
    // llama funcion navigate y pasa string con la ruta
    onNavigate('/registro');
  });

  botonLogin.addEventListener('click', () => {
    // llama funcion navigate y pasa string con la ruta
    onNavigate('/login');
  });

  // suman elementos a contenedor madre
  article.append(div1,div2);
  // retorna contenedor madre
  return article;
};



