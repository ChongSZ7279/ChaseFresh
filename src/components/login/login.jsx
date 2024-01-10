// Login.js

import React, { useState } from 'react';
import { auth, googleProvider } from '../../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Navigate } from 'react-router-dom';  // Import Navigate
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      // Sign in the user using Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Assuming the login is successful
      setLoginSuccess(true);
      onLoginSuccess();
    } catch (error) {
      console.error(error.message);
      // Handle login failure (show an error message, etc.)
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setLoginSuccess(true);
      onLoginSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="grey-container">
        <h1>Login</h1>
        <div className="form">
          <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <div className="checkbox">
            <div className="checkbox-container">
              <p>
                Doesn't have an account? <b><a href="/register">Register</a></b>
              </p>
              <p>
                Login with Google?<b><a onClick={signInWithGoogle}>Google</a></b>
              </p>
            </div>
            <button className="submit-button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
          {loginSuccess && <Navigate to="/home" />} {/* Redirect conditionally */}
      </div>
    </>
  );
};

export default Login;

