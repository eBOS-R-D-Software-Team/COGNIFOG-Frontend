// src/pages/ServiceRequest.js
import React, { useState } from 'react';
import { Button } from 'antd';
import Application from '../components/Application';
import ComponentSection from '../components/Component';
import JobSection from '../components/JobSection';
import '../design/ServiceRequest.css';
import { getApplicationInformation } from '../actions/applicationactions';
import { useDispatch } from 'react-redux';

const ServiceRequest = () => {
  const [applicationId, setApplicationId] = useState(null); // To capture the applicationId
  const [componentId, setComponentId] = useState(null);     // To capture the componentId

  const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = () => {
     
    
      dispatch(getApplicationInformation(applicationId)).then((response) => {
       console.log("submitted all application information, response: ", response);
      });
    };
  return (
    <div className="service-request p-3 form-container">
      <h3>Service Request</h3>
      <Application setApplicationId={setApplicationId} /> {/* Pass setApplicationId to capture */}
      {applicationId && (
        <ComponentSection applicationId={applicationId} setComponentId={setComponentId} />
      )}
      {componentId && <JobSection componentId={componentId} />}
      <div className="button-container">
        <Button onClick={handleSubmit} type="primary" className="button-primary">Submit All</Button>
      </div>
    </div>
  );
};

export default ServiceRequest;
