// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ServiceRequest from './pages/ServiceRequest';
import './index.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/service-request" element={<ServiceRequest />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
