// register.jsx

import React, { useState } from 'react';
import { auth, googleProvider } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import './register.css';

const Register = ({ onLoginSuccess }) => {
  const [selectedOption, setSelectedOption] = useState('normal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // State for error message
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const signIn = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      setLoginSuccess(true);
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setLoginSuccess(true);
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="grey-container">
        <h1>Register</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <div className="form">
          <input type="text" placeholder="Gmail" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />

          <div className="dropdown-container">
            <select value={selectedOption} onChange={handleDropdownChange}>
              <option value="normal">Normal</option>
              <option value="specialEye">Special Eye</option>
              <option value="specialEar">Special Ear</option>
              <option value="specialMouth">Special Mouth</option>
              <option value="experiencePerson">Experience Person</option>
            </select>
          </div>

          <div className="checkbox">
            <div className="checkbox-container">
              <p>
                Already have an account? <b><a href="/">Login</a></b>
              </p>
              <p>
                Login with Google?<b><a onClick={signInWithGoogle}>Google</a></b>
              </p>
            </div>
            <button className="submit-button" onClick={signIn}>
              Register
            </button>
          </div>
        </div>
        {loginSuccess && <Navigate to="/home" />}
      </div>
    </>
  );
};

export default Register;
