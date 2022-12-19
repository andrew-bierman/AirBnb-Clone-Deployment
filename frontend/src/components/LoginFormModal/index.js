// frontend/src/components/LoginFormModal/index.js
import React, { useReducer, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        }
      );
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    // setCredential('demo@user.io')
    // setPassword('password')
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        { (errors.length > 0) && (
          <ul className='errors'>
            {errors.map((error, idx) => (
              <li key={idx} className='error'>{error}</li>
            ))}
          </ul>
        ) }
        {/* <label>
          Username or Email */}
          <input
            type="text"
            placeholder="Username or Email"
            minLength='3'
            maxLength='256'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        {/* </label> */}
        <br></br>
        {/* <label>
          Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {/* </label> */}
        <br></br>
        <button type="submit">Log In</button>
        <button className='demo-button' type='demo' onClick={handleDemo}>Demo User</button>
      </form>

    </>
  );
}

export default LoginFormModal;
