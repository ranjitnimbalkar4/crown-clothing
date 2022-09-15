// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { 
   getFirestore,
   doc, 
   getDoc, 
   setDoc, 
   collection,
   writeBatch,
   query,
   getDocs 
  } from "firebase/firestore";

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>  {
  const collectionsRef = collection(db, collectionKey);
  
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
      const docRef = doc(collectionsRef, object.title.toLowerCase());
      batch.set(docRef, object);
  });

  await batch.commit();
  console.log("DONE..");
}

export const getCategoriesAndDocuments = async () => {
  const colleectionRef = collection(db, 'catergories');
  const q = query(colleectionRef);

  const querySnapshot =  await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
      }, {});

  return categoryMap;
}

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

export const singOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback );
