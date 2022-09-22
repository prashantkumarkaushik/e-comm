import {useEffect} from 'react'
import { auth, signInWithGooglePopUp, createUserDocumentFromAuth, /* signInWithGoogleRedirect  */ } from '../../src/utils/firebase/firebase.utils.js'
import {getRedirectResult} from 'firebase/auth'
import SignUpForm from '../../src/components/sign-up/sign-up-form.component.jsx'
import SignInForm from '../../src/components/sign-in/sign-in-form.component.jsx'
import './authentication.styles.scss'

const Authentication = () => {
  
  // useEffect(() => {
  //     const getResponse = async () => {
  //     const response =await getRedirectResult(auth)
  //     if(response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user)
  //     }
  //   }
  //   getResponse()
  // }, [])

  return(
    <div className='authentication-container'>
      {/* <button onClick={signInWithGoogleRedirect}>SignIn with Google Redirect</button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication 
