import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Application from '../components/Application';
import ComponentSection from '../components/Component';
import JobSection from '../components/JobSection';
import ChannelsSection from '../components/Channels';
import '../design/ServiceRequest.css';
import { fetchComponents } from '../actions/componentActions';
import { getApplicationInformation } from '../actions/applicationactions';

const ServiceRequest = () => {
  const { applicationId: urlApplicationId } = useParams(); 
  const [applicationId, setApplicationId] = useState(urlApplicationId || null);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);
  const [isComponentsSubmitted, setIsComponentsSubmitted] = useState(false);
  const [isJobsSubmitted, setIsJobsSubmitted] = useState(false);
  const [isChannelsSubmitted, setIsChannelsSubmitted] = useState(false);
  
  const dispatch = useDispatch();
  const components = useSelector((state) => state.components.components);

  useEffect(() => {
    if (applicationId) {
      dispatch(fetchComponents(applicationId));
      setIsApplicationSubmitted(true);
    }
  }, [applicationId, dispatch]);

  const handleSubmit = () => {
    dispatch(getApplicationInformation(applicationId)).then((response) => {
      console.log("Submitted all application information, response: ", response);

      // ✅ Show success notification
      notification.success({
        message: 'Application Submitted',
        description: 'All application information has been added successfully!',
      });
    });
  };

  // ✅ Handle creating a new application
  const handleCreateNewApplication = () => {
    setApplicationId(null);
    setSelectedComponentId(null);
    setIsApplicationSubmitted(false);
    setIsComponentsSubmitted(false);
    setIsJobsSubmitted(false);
    setIsChannelsSubmitted(false);
  };

  const isAllSubmitted =
    isApplicationSubmitted &&
    isComponentsSubmitted &&
    isJobsSubmitted &&
    isChannelsSubmitted;

  return (
    <div className="service-request p-3 form-container">
      <h3>Service Request</h3>
      
      {/* Application Section */}
      {!applicationId ? (
        <Application setApplicationId={setApplicationId} />
      ) : (
        <>
          {/* Component Section (Select or Add a New One) */}
          <ComponentSection
            applicationId={applicationId}
            setSelectedComponentId={setSelectedComponentId}
            setIsComponentsSubmitted={setIsComponentsSubmitted}
            components={components} 
          />

          {/* Job Section (For Selected Component) */}
          {selectedComponentId && (
            <JobSection componentId={selectedComponentId} setIsJobsSubmitted={setIsJobsSubmitted} />
          )}

          {/* Channels Section (Only if there are 2 or more components) */}
          {components.length >= 2 && (
            <ChannelsSection applicationId={applicationId} components={components} setIsChannelsSubmitted={setIsChannelsSubmitted} />
          )}

          {/* Submit Button - Show only when all sections are submitted */}
          {isAllSubmitted && (
            <div className="button-container">
              <Button onClick={handleSubmit} type="primary" className="button-primary">
                Submit All
              </Button>
            </div>
          )}

          {/* ✅ "Create New Application" Button (Resets everything) */}
          <div className="button-container">
            <Button onClick={handleCreateNewApplication} type="default" className="button-secondary">
              Create New Application
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceRequest;
