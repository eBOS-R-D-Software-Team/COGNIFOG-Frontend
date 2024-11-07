// src/pages/ServiceRequest.js
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Application from '../components/Application';
import ComponentSection from '../components/Component';
import JobSection from '../components/JobSection';
import ChannelsSection from '../components/Channels';
import '../design/ServiceRequest.css';
import { fetchComponents } from '../actions/componentActions';

const ServiceRequest = () => {
  const { applicationId: urlApplicationId } = useParams(); // Retrieve applicationId from URL
  const [applicationId, setApplicationId] = useState(urlApplicationId || null); // Allow capturing new application ID
  const [componentId, setComponentId] = useState(null); // Track componentId for jobs
  const dispatch = useDispatch();

  // Get components from the Redux store
  const components = useSelector((state) => state.components.components);

  // Fetch components when applicationId changes
  useEffect(() => {
    if (applicationId) {
      dispatch(fetchComponents(applicationId));
    }
  }, [applicationId, dispatch]);

  // Handle form submission
  const handleSubmit = () => {
    console.log("Submitting application with ID:", applicationId); // Check if applicationId is correct
  };

  return (
    <div className="service-request p-3 form-container">
      <h3>Service Request</h3>
      <Application setApplicationId={setApplicationId} /> {/* setApplicationId now updates dynamically */}
      
      {applicationId && (
        <ComponentSection applicationId={applicationId} setComponentId={setComponentId} />
      )}
      
      {componentId && <JobSection componentId={componentId} />} {/* JobSection appears after component is created */}

      {/* Render ChannelsSection only if there are 2 or more components */}
      {components.length >= 2 && <ChannelsSection components={components} />}

      <div className="button-container">
        <Button onClick={handleSubmit} type="primary" className="button-primary">
          Submit All
        </Button>
      </div>
    </div>
  );
};

export default ServiceRequest;
