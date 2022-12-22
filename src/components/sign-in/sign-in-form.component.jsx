import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input-component.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component.jsx";
import "./sign-in.styles.scss";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action.js";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const [formFields, setformFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setformFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setformFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        alert("wrong email and password");
      } else {
        console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <p>Sign In with your Email and Password</p>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          type="email"
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          required
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
