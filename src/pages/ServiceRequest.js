// src/pages/ServiceRequest.js
import React from 'react';
import { Button } from 'antd';
import Application from '../components/Application';
import ComponentSection from '../components/Component';
import Channels from '../components/Channels';
import '../design/ServiceRequest.css';

const ServiceRequest = () => {
  return (
    <div className="service-request p-3 form-container">
      <h3>Service Request</h3>
      <Application />
      <ComponentSection />
      <Channels />
      <div className="button-container">
        <Button type="primary" className="button-primary">Next</Button>
      </div>
    </div>
  );
};
export default ServiceRequest;
