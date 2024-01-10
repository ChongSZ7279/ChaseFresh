// App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Cover from './components/cover/cover';
import Login from './components/login/login';
import Register from './components/register/register';
import Nav from './components/nav/smallNav';
import Home from './components/home/home';
import Refrigerator from './components/refrigerator/refrigerator';
import Thing from './components/thing/thing';
import Manual from './components/thing/manual';
import Auto from './components/thing/auto';
import AutoScan from './components/thing/autoScan';
import AddType from './components/type/add';
import Personal from './components/personal/personal';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate successful login or registration after 3 seconds
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  const onLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Router>
        {isLoggedIn && <Nav />}
        <Routes>
          <Route
            path="/"
            element={
              showContent ? (
                <Login onLoginSuccess={onLoginSuccess} />
              ) : (
                <Cover />
              )
            }
          />
          <Route
            path="/register"
            element={<Register onLoginSuccess={onLoginSuccess} />}
          />
          {isLoggedIn && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/refrigerator" element={<Refrigerator />} />
              <Route path="/add-thing" element={<Thing />} />
              <Route path="/add-thing/manual" element={<Manual />} />
              <Route path="/add-thing/autoscan" element={<AutoScan />} />
              <Route path="/add-thing/autoscan/auto" element={<Auto />} />
              <Route path="/add-type" element={<AddType />} />
              <Route path="/personal-information" element={<Personal />} />
            </>
          )}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

