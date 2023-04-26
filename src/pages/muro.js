import { onNavigate } from '../router/router';
import { btnLogout} from '../componentes/funciones.js';
import { auth } from '../firebase/firebase';
import { crearPost, exit, obtenerPost } from '../firebase/firebase-funcion.js';


export const wall = () => {
  /* *** DECLARACION DE VARIABLES *** */
  // --------------------------------------- 
  // Aplico formato a Body y Header de Muro 
  document.querySelector('body').classList.add('login__body', 'login__todo-body');//creo una clase al body, lo que me permite colocar imagenes separadas a cada pagina como registrer/home/etc, se debe crear en cada una de las paginas
  document.querySelector('body').classList.remove('home__body');//creo la clase registro__header
  // document.querySelector('body').classList.remove('registro__body', 'registro__todo-body');//creo 
  document.querySelector('header').classList.add('muro__header');//creo la clase registro__header

  //------- Seccion Contenedor principal
  const section = document.createElement('section');
  section.classList.add('muro-section');

  const div1 = document.createElement('div');
  div1.classList.add('div1-cerrarSesion');  
  /* ------ Llamada Boton Cerrar sesion/Logout */
  const botonLogout = btnLogout() ;
  botonLogout.classList.add('botonLogout-muro');  
  div1.append(botonLogout);

  // const tituloT = document.createElement('h1');
  // // modifica propiedades de los elemento
  // // tituloT.classList.add('tituloT');

  // tituloT.textContent = 'LA TETERIA';


  const Comentario = document.createElement('textarea');
  Comentario.classList.add('input-comentarios');
  Comentario.setAttribute('placeholder','texto de tu comentario');

  const botonGuardar = document.createElement('button');
  botonGuardar.textContent='Guardar post';


  botonGuardar.addEventListener('click', ()=>{
    crearPost(Comentario.value).then (()=>{
      console.log('guardado en sistema');
    }) 
    // console.log('textarea'+ textarea.value);
  }) 

// const array=obtenerPost();
// console.log( array);

// array.forEach((post)=>{
//   console.log(post);
// })
obtenerPost((querySnapshot) => {
const articlePosts = document.createElement('article')
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const p = document.createElement('p');
      p.classList.add('clase-p');
      //crear clase para dar estilo a p
      p.textContent = doc.data().mensaje;
      // p.textContent = doc.data().fecha;

      articlePosts.append(p);
      section.append(articlePosts);
  })
})

/**** FUNCIONES AddEventListener ********************************************/ 

// Escucha en boton Salir
botonLogout.addEventListener('click',e =>{
  e.preventDefault();
  exit ().then( function () {
    onNavigate('/');
  })
})


section.append(div1,/*tituloT,*/ Comentario,botonGuardar)

    // retorna el elemento
    return section;
  };