import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { onNavigate } from "../router/router.js";

// /* ------ */
// export const registrarUsuario = (email, password) => {
//     createUserWithEmailAndPassword(auth, email, password)
 
// }


/* ------VERSION ORIGINAL DE LA EXPORTACION CREATE.USER */
export const registrarUsuario = async (email, password) => {
  try { /*valida el correo existente el la base de firebase si existe entra al login */
     const validarCorreo = await fetchSignInMethodsForEmail(auth,email);
     if (validarCorreo && validarCorreo.length>0) {
        alert('correo ya existe');
         onNavigate('/login');
     }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Signed in
    const user = userCredential.user;
    console.log('usuario: '+ user);
    console.log(user);


  } catch (error) {
      alert ('Algo ha ido mal, por favor intentalo despues.')
    return error;
  }
  return null;
}
