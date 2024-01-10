import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase'; // Import your Firebase authentication object

import './personal.css';

const Personal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Add an event listener to detect changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setEmail(user.email);
        // Note: Firebase does not expose the user's password for security reasons
      } else {
        // User is signed out
        setEmail('');
        setPassword('');
      }
    });

    // Cleanup the event listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Perform save/update logic here
    // For example, you can send a request to update user information on the server
    // After saving, you may want to set isEditing back to false
    setIsEditing(false);
  };

  return (
    <>
      <div className='title'>Personal Information</div>
      <div className="grey-container">
        <div className="form">
          <input
            type="text"
            placeholder={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!isEditing}
          />
          <input
            type="password"
            placeholder="********" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly={!isEditing}
          />
          <div className="checkbox">
            {isEditing ? (
              <button className="submit-button" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="submit-button" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Personal;
