// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtIsgo_caD3c8iw13mhnSDXwMEpKfYAtw",
  authDomain: "crown-clothing-db-5bf01.firebaseapp.com",
  projectId: "crown-clothing-db-5bf01",
  storageBucket: "crown-clothing-db-5bf01.appspot.com",
  messagingSenderId: "106915264458",
  appId: "1:106915264458:web:fdf854c9e77d207053c133",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, addtionalFields = {}) => {
    if(! userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(! userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName, email, createdAt, ...addtionalFields
        });
      }catch(error){
         console.log('error creating user : ', error.message);
      }
    }
} 

export const createAuthUserWithUserAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const singInAuthUserWithUserAndPassword = async (email, password) => {
  if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}
