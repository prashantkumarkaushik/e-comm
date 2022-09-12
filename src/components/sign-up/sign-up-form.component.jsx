import {useState } from 'react'
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils.js'

const defaultFormFields = {
  displayName:'',
  email: '',
  password: '',
  confirmPassword: ''
}


const SignUpForm = () => {

  const [formFields, setformFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields

  const resetFormFields = () => {
    setformFields(defaultFormFields)
  } 

  const handleChange = (event) => {
    const {name, value} = event.target

    setformFields({...formFields, [name]:value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(password !== confirmPassword) {
      alert('password does not match')
      return
    }

    try{
      const {user} = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields()
    } catch(error){
      if(error.code === 'auth/email-already-in-use') {
        alert('email already in use')
      }
      else{
        console.log('cannot create user with email and password', error)
      }
    }
  } 

  return(
    <div>
      <h1>Sign Up with your Email and Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input required type='text' 
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />
        
        <label>Email</label>
        <input required type='email'
          name='email'
          value={email}
          onChange={handleChange}
        />
        
        <label>Password</label>
        <input required type='password'
          name='password'
          value={password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input required type="password"
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
        />

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
