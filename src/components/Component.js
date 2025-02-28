import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { createComponent } from '../actions/componentActions';

const ComponentSection = ({ applicationId, setComponentId }) => {
  const dispatch = useDispatch();
  const [componentName, setComponentName] = useState('');

  const handleComponentSubmit = () => {
    const payload = { name: componentName };

    dispatch(createComponent({ componentId: applicationId, payload }))
      .then((response) => {
        const newComponentId = response.payload?.id;
        if (newComponentId) {
          setComponentId(newComponentId); // Pass componentId to display JobSection
          message.success('Component added successfully!', 3);
        }
      })
      .catch(() => {
        message.error('Failed to add component. Please try again.', 3);
      });
  };

  return (
    <div className="component-section">
      <h4>Component</h4>
      <Form layout="vertical" onFinish={handleComponentSubmit}>
        <Form.Item label="Component Name" required>
          <Input value={componentName} onChange={(e) => setComponentName(e.target.value)} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Component
        </Button>
      </Form>
    </div>
  );
};

export default ComponentSection;
