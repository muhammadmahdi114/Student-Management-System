import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard/dashboard";
import Login from "./components/Login/login";
import RegisterStudent from "./components/RegisterStudent/registerStudent";
import RegisterAdmin from "./components/RegisterAdmin/registerAdmin";

function App() {

  useEffect(() => {
    document.title = 'AMN Management System';
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registerStudent" element={<RegisterStudent />} />
        <Route path="/registerAdmin" element={<RegisterAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
