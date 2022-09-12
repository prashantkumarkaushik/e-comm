import {initializeApp} from 'firebase/app'
import { getAuth, /* signInWithRedirect, */ signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore'

// we need to paste our own firebase config in order to connect firebase with our react app
const firebaseConfig = {
  apiKey: "AIzaSyDI4lF4CllGLBU7sFFZxnEr1uuEbzzHrQo",
  authDomain: "e-comm-db-4d83e.firebaseapp.com",
  projectId: "e-comm-db-4d83e",
  storageBucket: "e-comm-db-4d83e.appspot.com",
  messagingSenderId: "486539735388",
  appId: "1:486539735388:web:41cf0c43a144428ca89199"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});


export const auth = getAuth()

export const signInWithGooglePopUp = () => signInWithPopup(auth, provider); 
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider); 

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalUserInformation = {}) => {
  if(!userAuth) return;
  const userDocRef = doc(db ,"users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
     await setDoc(userDocRef, { 
      displayName,
      email,
      createdAt,
      ...additionalUserInformation
     })   
    } catch (error) {
     console.log("error creating user", error.message) 
    }
  } 

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
} 