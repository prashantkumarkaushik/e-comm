import {useEffect} from 'react'
import { auth, signInWithGooglePopUp, createUserDocumentFromAuth, /* signInWithGoogleRedirect  */ } from '../../src/utils/firebase/firebase.utils.js'
import {getRedirectResult} from 'firebase/auth'
import SignUpForm from '../../src/components/sign-up/sign-up-form.component.jsx'

const SignIn = () => {
  
  // useEffect(() => {
  //     const getResponse = async () => {
  //     const response =await getRedirectResult(auth)
  //     if(response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user)
  //     }
  //   }
  //   getResponse()
  // }, [])

  const logGoogleUser = async () => {
    const {user}= await signInWithGooglePopUp()
    const userDocRef =await createUserDocumentFromAuth(user)
  }
  return(
    <div>
      <h1>I am the SignIn page</h1>
      <button onClick={logGoogleUser}>SignIn with Google PopUp</button>
      {/* <button onClick={signInWithGoogleRedirect}>SignIn with Google Redirect</button> */}
      <SignUpForm />
    </div>
  )
}

export default SignIn
