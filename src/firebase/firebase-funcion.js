import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";


// /* ------ */
// export const registrarUsuario = (email, password) => {
//     createUserWithEmailAndPassword(auth, email, password)
 
// }


/* ------VERSION ORIGINAL DE LA EXPORTACION CREATE.USER */
export const registrarUsuario = (email, password) => {
  return  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;

console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
