import React from "react";
import SignUp from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';
const App = () => {

  return (
    <div>
     <Routes>
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
};

export default App;
