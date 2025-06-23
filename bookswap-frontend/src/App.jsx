import React from "react";
import SignUp from './pages/SignUp';
import Login from './pages/Login'; 
import HomePage from './pages/HomePage'; 
import { Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <div>
     <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
};

export default App;
