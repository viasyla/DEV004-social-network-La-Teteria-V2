import { onNavigate } from '../router/router';
import { btnLogout } from '../componentes/funciones.js';
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

  const divCerrarSesion = document.createElement('div');
  divCerrarSesion.classList.add('div1-cerrarSesion');  
  /* ------ Llamada Boton Cerrar sesion/Logout */
  const botonLogout = btnLogout() ;
  botonLogout.classList.add('botonLogout-muro');  
  divCerrarSesion.append(botonLogout);

  // const tituloT = document.createElement('h1');
  // // modifica propiedades de los elemento
  // // tituloT.classList.add('tituloT');

  // tituloT.textContent = 'LA TETERIA';

  /* ------ DIV SECCION PUBLICACION */
  const divPublicacion = document.createElement('div');
  divPublicacion.classList.add('div2-Publicacion');  

  let Comentario = document.createElement('textarea');
  Comentario.classList.add('input-comentarios','small-textarea');
  Comentario.setAttribute('placeholder','texto de tu comentario');

  const botonBorrarComentario = document.createElement('img');
  botonBorrarComentario.classList.add('borrar-comentario');
  botonBorrarComentario.src = './imagenes/basurero.png';

 
  
  let i=0;
  Comentario.addEventListener('keyup',(e)=>{
    console.log('largo : ',Comentario.textLength);
    const tecla = (document.all) ? e.keyCode : e.which;
  // if (tecla==13) 
  // let i = i+1;
  // alert ('Has pulsado enter :  '+i);
   
    if (tecla==13) {
      console.log('estoy dentro del if tecla 13');
      i=i+1;
      console.log('valor de I : ',i);
     // console.log('ya sali del while');
     // for (let index = 0; index <3; index++) {
     //   console.log('valor de I : '+index);
     //   alert ('Has pulsado enter :  ',index);
     // }
     }//cierre del if =13 enter
     if (i>=2) {
       Comentario.classList.add('medium-textarea');
     }
}) //cierre del key-up
// function BorrarComentario(){
//   // const botonborrarComentario= Comentario 
// }

   
  const botonEnviarPost = document.createElement('button');
  botonEnviarPost.textContent='Enviar';
// const botonEnviarPost = btnGuardarPost();
// botonEnviarPost.textContent='Enviar';//guardar y enviar post en Muro

  botonEnviarPost.addEventListener('click', ()=>{
    crearPost(Comentario.value).then (()=>{
      console.log('guardado en sistema');
      console.log('valor del i : ',i);
      i=0;//limpia el valor del contador de enter
      console.log('valor del i despues: ',i);
    // section.removeChild(section.lastElementChild);
      
      // console.log('largo : ',Comentario.textLength);
    }) 
   
    // console.log('textarea'+ textarea.value);
  })
divPublicacion.append(Comentario,botonBorrarComentario,botonEnviarPost)
// const array=obtenerPost();
// console.log( array);

// array.forEach((post)=>{
//   console.log(post);
// })
obtenerPost((querySnapshot) => {
  const existePost=document.getElementById('posts');
  if (existePost) {
    existePost.remove();
  }
const articlePosts = document.createElement('article')
articlePosts.id='posts';
    //  articlePosts.innerHTML='';
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      
      const p = document.createElement('p');
      p.classList.add('clase-p');

      const pFecha = document.createElement('p');
      p.classList.add('clase-pFecha');

      //crear clase para dar estilo a p
      p.textContent = doc.data().mensaje;
      pFecha.textContent = doc.data().fecha;

      articlePosts.append(p,pFecha);
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


section.append(divCerrarSesion,divPublicacion/*tituloT, Comentario,botonEnviarPost*/)

    // retorna el elemento
    return section;
  };