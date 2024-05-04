import { useState } from "react";
import "./Login.css";

/**
 * @typedef {Object} LoginViewProps
 * @property {(user: import('../../dataAccess').User)=>Promise<void>} onLogin
 */

/**
 * @param {LoginViewProps} props
 */
export default function LoginView({ onLogin }) {
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // Convert the data into a text object
    const formJson = Object.fromEntries(formData.entries());
    try {
      await onLogin(formJson);
    } catch {
      setLoginError("Usuario o contraseña incorrecta!");
    }
  };

  return (
    <div className="LoginViewContainer">
      <form className="LoginContainer" onSubmit={onSubmit}>
        <h2>Login</h2>
        <input placeholder="Username:" name="username" />
        <input placeholder="Password:" name="password" type="password" />
        <button className="PrimaryButton" type="submit">Log In</button>
        {loginError.length === 0 ? null : <p className="ErrorText">{loginError}</p>}
      </form>
    </div>
  );
}
