import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { createComponent } from '../actions/componentActions';
import './Component.css';

const { Option } = Select;

const ComponentSection = ({ applicationId, setSelectedComponentId, setIsComponentsSubmitted, components }) => {
  const dispatch = useDispatch();
  const [componentName, setComponentName] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentSubmit = () => {
    if (!componentName.trim()) {
      notification.warning({ message: 'Component Name Required', description: 'Please enter a component name.' });
      return;
    }

    const payload = { name: componentName };
    dispatch(createComponent({ applicationId, payload }))
      .then((response) => {
        const newComponentId = response.payload?.id;
        if (newComponentId) {
          setSelectedComponentId(newComponentId);
          setIsComponentsSubmitted(true);
          notification.success({
            message: 'Component Added Successfully',
            description: 'The component has been successfully created.',
          });
          setComponentName('');
        }
      })
      .catch(() => {
        notification.error({
          message: 'Error Adding Component',
          description: 'There was an error adding the component. Please try again.',
        });
      });
  };

  return (
    <div className="component-section">
      <h4>Component</h4>
      
      {/* Dropdown to select existing component */}
      {components.length > 0 && (
        <Select
          placeholder="Select an existing component"
          onChange={(value) => {
            setSelectedComponent(value);
            setSelectedComponentId(value);
            setIsComponentsSubmitted(true);
          }}
          style={{ width: '100%', marginBottom: '10px' }}
          value={selectedComponent}
        >
          {components.map((comp) => (
            <Option key={comp.id} value={comp.id}>
              {comp.name}
            </Option>
          ))}
        </Select>
      )}

      {/* Input for a new component */}
      <Form layout="vertical" onFinish={handleComponentSubmit}>
        <Form.Item label="Component Name">
          <Input
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            disabled={!!selectedComponent} // Disable if an existing component is selected
            placeholder="Enter a new component name"
          />
        </Form.Item>
        {!selectedComponent && (
          <Button type="primary" htmlType="submit">
            Add Component
          </Button>
        )}
      </Form>
    </div>
  );
};

export default ComponentSection;
