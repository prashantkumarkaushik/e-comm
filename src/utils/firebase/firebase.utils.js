import { initializeApp } from 'firebase/app'

import {
  getAuth, /* signInWithRedirect, */
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
}
  from 'firebase/auth'

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  WriteBatch,
  collectionGroup,
  writeBatch,
  getDocs,
  query
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

// here we define which provider we need to use here
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

// we need to get auth from firebase
export const auth = getAuth()

export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider); 

// here we initialize  
export const db = getFirestore()

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'collections')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})
  return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalUserInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
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
  if (!email || !password) return
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
