import { useState } from "react";
import { signUpStart } from "../../store/user/user.action";
import FormInput from "../form-input/form-input-component.jsx";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component.jsx";
import { useDispatch } from "react-redux";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [formFields, setformFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setformFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already in use");
      } else {
        console.log("cannot create user with email and password", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <p>Sign Up with your Email and Password</p>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          type="text"
          label="Display Name"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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

        <FormInput
          required
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
