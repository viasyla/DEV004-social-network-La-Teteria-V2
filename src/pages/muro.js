import { onNavigate } from '../router/router';
import { btnLogout } from '../componentes/funciones.js';
import { auth } from '../firebase/firebase';
import { crearPost, eliminarComentario, exit,modificarPost,obtenerPost} from '../firebase/firebase-funcion.js';
import { documentId } from 'firebase/firestore';



export const wall = () => {
  /* *** DECLARACION DE VARIABLES *** */
  // ---------------------------------------
  // Aplico formato a Body y Header de Muro
  document.querySelector("body").classList.add("login__body","login__todo-body"); //creo una clase al body, lo que me permite colocar imagenes separadas a cada pagina como registrer/home/etc, se debe crear en cada una de las paginas
  document.querySelector("body").classList.remove("home__body"); //creo la clase registro__header
  // document.querySelector('body').classList.remove('registro__body', 'registro__todo-body');//creo
  document.querySelector("header").classList.add("muro__header"); //creo la clase registro__header

  //------- Seccion Contenedor principal
  const section = document.createElement("section");
  section.classList.add("muro-section");

  const divCerrarSesion = document.createElement("div");
  divCerrarSesion.classList.add("div1-cerrarSesion");
  /* ------ Llamada Boton Cerrar sesion/Logout */
  const botonLogout = btnLogout();
  botonLogout.classList.add("botonLogout-muro");
  divCerrarSesion.append(botonLogout);

  // const tituloT = document.createElement('h1');
  // // modifica propiedades de los elemento
  // // tituloT.classList.add('tituloT');

  // tituloT.textContent = 'LA TETERIA';

  /* ------ DIV SECCION PUBLICACION */
  const divPublicacion = document.createElement("div");
  divPublicacion.classList.add("div2-Publicacion");

  // const pMailUsuario = document.createElement('p');
  // pMailUsuario.textContent = doc.data().mail_usuario;

  let Comentario = document.createElement("textarea");
  Comentario.classList.add("input-comentarios", "small-textarea");
  Comentario.setAttribute("placeholder", "texto de tu comentario");
  Comentario.setAttribute('id','idComentario');

  // const botonBorrarComentario = document.createElement("img");
  // botonBorrarComentario.classList.add("borrar-comentario");
  // botonBorrarComentario.src = "./imagenes/basurero.png";
  
  // const botonEditar = document.createElement("img");
  // botonEditar.classList.add("editar-comentario");
  // botonEditar.src = "./imagenes/editar.png";

  let i = 0;
  Comentario.addEventListener("keyup", (e) => {
    console.log("largo : ", Comentario.textLength);
    const tecla = document.all ? e.keyCode : e.which;
    if (tecla == 13) {
      console.log("estoy dentro del if tecla 13");
      i = i + 1;
      console.log("valor de I : ", i);
    } //cierre del if =13 enter
    if (i >= 2) {
      Comentario.classList.add("medium-textarea");
    }
  }); //cierre del key-up

  const botonEnviarPost = document.createElement("button");
  botonEnviarPost.setAttribute('id','idBtnEnviarPost');
  botonEnviarPost.textContent = "Enviar";
  // const botonEnviarPost = btnGuardarPost();
  // botonEnviarPost.textContent='Enviar';//guardar y enviar post en Muro

  botonEnviarPost.addEventListener("click", () => {
    crearPost(Comentario.value).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      // console.log('valor del i : ',i);
      i = 0; //limpia el valor del contador de enter
      // console.log('valor del i despues: ',i);
      // section.removeChild(section.lastElementChild);
      // console.log('largo : ',Comentario.textLength);
    });
    // console.log('textarea'+ textarea.value);
  });
  divPublicacion.append(Comentario,/* botonBorrarComentario,botonEditar,*/ botonEnviarPost);
  // const array=obtenerPost();
  // console.log( array);

  // array.forEach((post)=>{
  //   console.log(post);
  // })
  obtenerPost((querySnapshot) => {
    const existePost = document.getElementById("posts");
    if (existePost) {
      existePost.remove();
    }
    const articlePosts = document.createElement("article");
    articlePosts.id = "posts";
    //  articlePosts.innerHTML='';
    querySnapshot.forEach((doc) => {
      console.log('VALOR DE DOC deberia mostrar el valor del id : ',doc);
      console.log(doc.data());

      const divMostrarPost = document.createElement("div");
      divMostrarPost.classList.add('div-MostrarPost')


      const p = document.createElement("p");
      p.classList.add("clase-p");

      const pFecha = document.createElement("p");
      p.classList.add("clase-pFecha");

      const pMailUsuario = document.createElement("p");
      pMailUsuario.textContent = doc.data().mail_usuario;
      

      
      //crear clase para dar estilo a p
      p.textContent = doc.data().mensaje;
      pFecha.textContent = doc.data().fecha_creacion;
      console.log("valor variable pFecha :", pFecha);

      mifecha(pFecha.textContent);
      console.log("valor de la funcion mifecha :", mifecha(pFecha));
      
      const divTodosPost = document.createElement('div');
      divTodosPost.classList.add("div-TodosPost");
      
      const botonBorrarComentario2 = document.createElement("img");
      botonBorrarComentario2.classList.add("borrar-comentario");
      // botonBorrarComentario2.setAttribute('click',eliminarComentario('${doc.id}'));
      botonBorrarComentario2.src = "./imagenes/basurero.png";

      const botonEditar2 = document.createElement("img");
      botonEditar2.classList.add("editar-comentario");
      botonEditar2.src = "./imagenes/editar.png";

      divTodosPost.append(botonBorrarComentario2,botonEditar2);
      // ESCUCHA EN BOTON BORRAR COMENTARIO2 
      botonBorrarComentario2.addEventListener("click", (e) => {
        e.preventDefault();
      // console.log("ID publicacion: ", docRef.id);

      // const db = firebase.firestore();
      // const docRef = db.collection('nombre_de_la_coleccion').doc('id_del_documento');
      
      // Obtén el ID del documento
      // const docId = docRef.id;
      
      // console.log('ID del documento:', docRef.id);
      // obtenerID();
        eliminarComentario(doc.id).then(() => {
          console.log("se elimino el comentario");
        });
      });

      // console.log("Document written with ID: ", docRef.id);
      const btnEnviarModificacion = document.createElement('button');
      btnEnviarModificacion.innerText='Enviar Cambios';
      const inputModificarDatos = document.createElement('input');

      inputModificarDatos.style.display = "none";
      btnEnviarModificacion.style.display = "none";

      divMostrarPost.append(pMailUsuario,p,divTodosPost);

      // ESCUCHA EN BOTON EDITAR POST
      botonEditar2.addEventListener('click', (e/*,doc.id,doc.data().mensaje*/) =>{
        e.preventDefault();
        console.log('valor de DOC.ID :', doc.id);
                console.log('valor de DOC.DATA :', doc.data().mensaje);

        inputModificarDatos.style.display = "block";
        btnEnviarModificacion.style.display = "block";
        
        btnEnviarModificacion.addEventListener('click',function () {
          console.log('Input modificar datos :', inputModificarDatos.value);

          modificarPost(doc.id,inputModificarDatos.value).then(() =>{
  
            console.log(' SE MODIFICO EL COMENTARIO');
          });
          
        }) 

    
      

      });

      articlePosts.append(divMostrarPost,
        /*pMailUsuario,
        p,*/
        /*pFecha,*/
        inputModificarDatos, btnEnviarModificacion/*,divTodosPost/*botonBorrarComentario2,botonEditar2*/
      );
      section.append(articlePosts);
    }); //final querySnapshot
  }); //final funcion obtener post

  /**** FUNCIONES AddEventListener ********************************************/

  // Escucha en boton Salir
  botonLogout.addEventListener("click", (e) => {
    e.preventDefault();
    exit().then(function () {
      onNavigate("/");
    });
  });

  section.append(
    divCerrarSesion,
    divPublicacion /*tituloT, Comentario,botonEnviarPost*/
  );

  // retorna el elemento
  return section;
};

/********************************************************************** */

function mifecha(pfecha) {
  // let fecha = pfecha
  

  // Supongamos que tenemos un timestamp en milisegundos
// const timestamp = 1620632400000;
console.log('LN163-valor pfecha :',pfecha);

// Creamos un nuevo objeto Date utilizando el timestamp
const fecha = new Date(pfecha);
console.log('LN165-fecha en funcion mifecha :',fecha);

// Obtenemos las partes de la hora
const horas = fecha.getHours();
const minutos = fecha.getMinutes();
const segundos = fecha.getSeconds();

// Puedes ajustar el formato de salida como desees
const horaFormateada = `${horas}:${minutos}:${segundos}`;

console.log('variable horaformateada :',horaFormateada); // Salida: "12:0:0"

}

