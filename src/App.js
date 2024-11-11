import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ICDashboard from "./components/IC/icDashboard";
import PCDashboard from "./components/PC/pcDashboard";
import SCDashboard from "./components/SC/scDashboard";
import MMCDashboard from "./components/MMC/mmcDashboard";
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
        <Route path="/ic-dashboard" element={<ICDashboard />} />
        <Route path="/pc-dashboard" element={<PCDashboard />} />
        <Route path="/sc-dashboard" element={<SCDashboard />} />
        <Route path="/mmc-dashboard" element={<MMCDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
