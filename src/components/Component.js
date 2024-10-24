// src/components/ComponentSection.js
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { createComponent } from '../actions/componentActions'; // Import action
import './Component.css';

const ComponentSection = ({ applicationId, setComponentId }) => {
  const dispatch = useDispatch();
  const [componentData, setComponentData] = useState({
    componentName: '',
  });

  const handleComponentSubmit = () => {
    // Only component name should be in the payload
    const payload = {
      name: componentData.componentName, // Make sure the key is `name` to match the backend
    };
  
    // Dispatch with applicationId in the URL
    dispatch(createComponent({ applicationId, componentData: payload })).then((response) => {
      const newComponentId = response.payload.id;
      setComponentId(newComponentId); // Pass componentId to the parent for job creation
    });
  };
  

  return (
    <div className="component-section">
      <h4>Component</h4>
      <Form layout="vertical" onFinish={handleComponentSubmit}>
        <Form.Item label="Name" name="componentName">
          <Input
            value={componentData.componentName}
            onChange={(e) => setComponentData({ ...componentData, componentName: e.target.value })}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="add-component-button">
          Add New Component
        </Button>
      </Form>
    </div>
  );
};

export default ComponentSection;
