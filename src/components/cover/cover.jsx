import React from 'react';
import './cover.css';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';

const Cover = () => {
  return (
    <>
      <div className="cover">
        <div className="cover-title">
          <CgSmartHomeRefrigerator className="cover-icon" />
        </div>
        <div className="cover-text">
          <h1>Chasing</h1>
          <p>Stay Fresh, Stay Alert - Your Expiry Date Companion</p>
        </div>
      </div>
    </>
  );
};

export default Cover;
