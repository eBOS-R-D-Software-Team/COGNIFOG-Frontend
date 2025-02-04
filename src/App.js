import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ServiceRequest from "./pages/ServiceRequest";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MonitoringManager from "./pages/MonitoringManager";
import "./index.css";

const AppContent = () => {
  const location = useLocation(); // Get current route

  // Hide Navbar & Sidebar only on the login page
  const isLoginPage = location.pathname === "/";

  return (
    <div>
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <Sidebar />}
      
      <div className="content">
        <Routes>
          <Route path="/service-request" element={<ServiceRequest />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/monitoring-manager" element={<MonitoringManager />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
