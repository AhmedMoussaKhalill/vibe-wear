import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp'; 

function App() {
  return (
    <div className="flex h-screen w-full bg-gray-200">
      <div className="flex w-full items-center justify-center bg-gray-300 lg:w-full">
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </div>
    </div>
  );
}

export default App;