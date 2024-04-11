import { auth } from "./firebase"

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";



export const doCreateUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };
  
  export const doSignInWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };
  
  export const doSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  export const doSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

// export const doCreateUserWithEmailAndPassword = async ( email, password) => {
//       return doCreateUserWithEmailAndPassword(auth, email, password);
// }

// export const doSignWithEmailAndPassword = async ( email, password) => {
//     return doSignWithEmailAndPassword(auth, email, password);
// }

// export const doSignWithGoogle = async () => {
//    const provider = new GoogleAuthProvider();
//    const result = await doSignWithGoogle(auth, provider);
//    return result;
// };

// export const doSignOut = () => {
//     return auth.doSignOut();
// }

