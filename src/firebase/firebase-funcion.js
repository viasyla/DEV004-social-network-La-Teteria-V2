import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword,fetchSignInMethodsForEmail} from "firebase/auth";
import { onNavigate } from "../router/router.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  collection,addDoc,getFirestore,Timestamp,doc, deleteDoc,updateDoc} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// /* ------ */
/* ------VERSION ORIGINAL DE LA EXPORTACION CREATE.USER */
export const registrarUsuario = async (email, password) => {
  try {
    /*valida el correo existente el la base de firebase si existe entra al login */
    const validarCorreo = await fetchSignInMethodsForEmail(auth, email);
    console.log("validar correo 1:", validarCorreo); //si el correo existe en la consola me muestra la palabra "password"
    console.log("validar correo largo :", validarCorreo.length); //si el correo existe en firebase me da el largo 1, de lo contrario 0

    if (validarCorreo && validarCorreo.length > 0) {
      //si correo existe en BBDD, envia mensaje y lo redirige al /Login
      alert("LN20 -- Correo ya existe. Ingrese con su cuenta registrada.");
      onNavigate("/login");
    } else {
      //si el correo no existe en BBDD lo crea, envia mensaje y lo envia a /Muro
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log("usuario: " + user);
      console.log(user);
      alert("LN29 -- Usuario registrado con exito.");
      return onNavigate("/muro");
    }
  } catch (error) {
    //Si el codigo de error es distinto a mail registrado, envia mensaje, de lo contrario no hace nada
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errorCode : ", errorCode);
    if (errorCode !== "auth/email-already-in-use") {
      // errorCode = error.code;
      // errorMessage = error.message;
      console.log("errorCode : ", errorCode);
      alert("Algo ha ido mal, por favor intentalo despues.");
      return error;
    }
  }
  return null;
};

/* *********** signInWithEmailAndPassword ********** */
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// /* FUNCION ORIGINAL  *//
// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

/* ******** VALIDAR INGRESO DE USUARIO LOGIN *********** */

export const ValidarIngresoUsuario = async (email, password) => {
  try {
    /*valida el correo existente el la base de firebase si existe entra al login */
    const validarCorreo = await fetchSignInMethodsForEmail(auth, email);
    console.log("LN86--validar SI correo existe correo : ", validarCorreo); //si el correo existe en la consola me muestra la palabra "password"
    console.log(
      "LN87--validar LARGO correo existente(existe >=0 no existe =<0) : ",
      validarCorreo.length
    ); //si el correo existe en firebase me da el largo 1, de lo contrario 0
    console.log("ver el nombre del correo : " + validarCorreo.value);

    if (validarCorreo && validarCorreo.length <= 0) {
      //si correo NO existe en BBDD, envia mensaje y lo redirige al /Registro
      alert("LN76 -- Correo no existe. Dirigiendo a Registro.");
      onNavigate("/registro");
    } else {
      //si el correo si existe en BBDD, revisa las claves ....envia mensaje y lo envia a /Muro

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      /* *** */ console.log("valor de userCredential : " + userCredential);
      const user = userCredential.user;
      /* *** */ console.log("valor de user : " + user);
      alert("LN86 -- Usuario logueado con exito.");
      return onNavigate("/muro");
    }
  } catch (error) {
    //Si el codigo de error es distinto a mail registrado, envia mensaje, de lo contrario no hace nada
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errorCode : ", errorCode);
    // if (errorCode !== 'auth/email-already-in-use' ) {
    //   // errorCode = error.code;
    //   // errorMessage = error.message;
    //   console.log('errorCode : ',errorCode)
    //   alert ('Algo ha ido mal, por favor intentalo despues. LOGIN')
    //   return error;
    // }
    switch (errorCode) {
      case "auth/wrong-password" /*autenticación/contraseña incorrecta*/:
        console.log("errorCode : ", errorCode);
        alert("LN105 -- Contraseña incorrecta. Al 3er intento se bloqueará.");

        break;
      case "auth/too-many-requests" /*autenticación/demaciadas consultas*/:
        console.log("errorCode : ", errorCode);
        alert(
          "Ha superado el límite de intentos de inicio de sesión. Intente en unos minutos. "
        );
        break;
      case "" /*autenticación/contraseña incorrecta*/:
        console.log("errorCode : ", errorCode);
        alert("");
      default:
        break;
    }
  }
  return null;
};

/* ******** VALIDAR INGRESO USUARIO CON GOOGLE *********** */
export const validarConGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("LN166 -- Estoy logueado con google de benja");

      // This gives you a Google Access Token. You can use it to access the Google API.
      //TRADUCCION=>Esto le da un token de acceso de Google. Puede usarlo para acceder a la API de Google.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.// TRADUCCION=>La información del usuario registrado.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)// TRADUCCION =>Datos de IdP disponibles mediante getAdditionalUserInfo(resultado)
      // ...
      onNavigate("/muro");
    })
    .catch((error) => {
      // Handle Errors here. //TRADUCCION=>Manejar errores aquí.
      const errorCode = error.code;
      const errorMessage = error.message;

      // The email of the user's account used.//TRADUCCION=>El correo electrónico de la cuenta de usuario utilizada.
      const email = error.customData.email;

      // The AuthCredential type that was used.//TRADUCCION=>El tipo AuthCredential que se utilizó.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

/* ******** VALIDAR INGRESO USUARIO CON FACEBOOK *********** */

/* ******** VALIDAR SALIDA / LOGOUT USUARIO MURO *********** */
export const exit = () => {
  return signOut(getAuth()).then(() => {
    console.log(" Salir. ");
  });
};

const coleccionPublicaciones = collection(db, "publicaciones");

/* ******** CREAR POST DE USUARIO MURO *********** */
export const crearPost = function (texto) {
  const fechaActual = new Date();
  const marcaTiempo = Timestamp.fromDate(fechaActual);
  // Add a new document with a generated id.
  const documentoNuevoPost = {
    mensaje: texto,
    mail_usuario: auth.currentUser.email,
    fecha_creacion: marcaTiempo,
  };
  const addDocPromise = addDoc(coleccionPublicaciones, documentoNuevoPost);
  return addDocPromise;
};

/* ******** OBTENER POST DE USUARIO MURO *********** */
import { query, onSnapshot } from "firebase/firestore";
export const obtenerPost = (cb) => {
  const q = query(collection(getFirestore(), "publicaciones"));
  // const post = [];
  // onSnapshot(q, (querySnapshot) => {

  //   querySnapshot.forEach((doc) => {
  //     post.push(doc.data());
  //   });
  //   console.log("publicacion : ", post);
  // });
  // return post
  return onSnapshot(q, cb);
};


export const crearNombreUsuario = async function (texto) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(getFirestore(), "usuarios"), {
    nombreUsuario: texto,
    // mail_usuario : getAuth().currentUser.email,
    // fecha : marcaTiempo,
  })
    .then(() => {
      console.log("nombre de usuario creado en bd");
    })
    .catch((error) => {
      console.error("Error al guardar el nombre usuario bd", error);
    });
  // console.log("Document written with ID: ", docRef.id);
};

/*   BORRAR DOCUMENTO(COMENTARIO)  POR ID */
export const eliminarComentario =  function (id) {
  // const docRef = doc(db,"publicaciones",'dz8sxbtLKnXLomKCjvYI')
  const docRef = doc(db,"publicaciones",id)
  return deleteDoc( docRef );
};

/*    OBTENER ID DE LA PUBLICACION DE USUARIO    */
// const db = firebase.firestore();
// export const obtenerID = function () {
//   // const docRef = db
//   //   .collection("publicacion")
//   //   .doc("doc.id");
    //   const docRef = doc(db,"publicaciones",'doc.id')
//   // Obtén el ID del documento
//   const docId = docRef.id;
//   console.log("ID del documento en la funcion obtenerID: ", docId);
//   // return 
// };
/* ******** MODIFICAR POST DE USUARIO MURO *********** */
// const washingtonRef = doc(db, "publicaciones", "DC");
// // Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//       mensaje: texto,
//   // capital: true
// });

export const modificarPost = (id, texto) => {
  const nuevoValorRef = doc(db, "publicaciones", id);
  return updateDoc(nuevoValorRef, {
    mensaje: texto,
    // capital: true
    // return deleteDoc( docRef );
  });
};


// // import { doc, updateDoc } from "firebase/firestore";

// const washingtonRef = doc(db, "cities", "DC");

// // Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//   capital: true
// });




// export const crearPost = function (texto) {
//   // Add a new document with a generated id.
//   const documentoNuevoPost = {
//     mensaje: texto,
//     mail_usuario: auth.currentUser.email,
//     fecha_creacion: marcaTiempo,
//   };
//   const addDocPromise = addDoc(coleccionPublicaciones, documentoNuevoPost);
//   return addDocPromise;
// };

// /* original de modificar */
// // import { doc, updateDoc } from "firebase/firestore";
// const washingtonRef = doc(db, "cities", "DC");

// // Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//   capital: true
// });