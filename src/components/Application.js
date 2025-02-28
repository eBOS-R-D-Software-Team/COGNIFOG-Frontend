import React, { useState } from 'react'; 
import { Form, Select, Input, DatePicker, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { createApplication } from '../actions/applicationactions';
import './Application.css';

const { Option } = Select;

const Application = ({ setApplicationId }) => {
  const dispatch = useDispatch();

  // Initial form state for all inputs
  const [applicationData, setApplicationData] = useState({
    applicationName: '',
    description: '',
    trial: '',
    responsible: '',
    contact: '',
    type: '',
    date: null,
  });

  // Handle field changes
  const handleChange = (field, value) => {
    setApplicationData({
      ...applicationData,
      [field]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (values) => {
    const payload = {
      applicationName: values.applicationName,
      description: values.description,
    };
  
    dispatch(createApplication(payload)).then((response) => {
      // Assuming the API response contains the new applicationId
      const applicationId = response.payload.id;
      setApplicationId(applicationId); // Pass applicationId to the parent or component state
      
      // Show success alert
      message.success('Application added successfully!', 3);
    }).catch(() => {
      // Show error alert
      message.error('Failed to add application. Please try again.', 3);
    });
  };

  return (
    <div className="application-section">
      <h4>Application</h4>
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className="form-row">
          <Form.Item
            label="Select Trial"
            name="trial"
            initialValue={applicationData.trial}
            className="form-item"
          >
            <Select onChange={(value) => handleChange('trial', value)}>
              <Option value="THALES">THALES</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item
            label="Application Name"
            name="applicationName"
            initialValue={applicationData.applicationName}
            className="form-item"
            rules={[{ required: true, message: 'Please input the application name!' }]}
          >
            <Input onChange={(e) => handleChange('applicationName', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Responsible"
            name="responsible"
            initialValue={applicationData.responsible}
            className="form-item"
          >
            <Input onChange={(e) => handleChange('responsible', e.target.value)} />
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item
            label="Description"
            name="description"
            initialValue={applicationData.description}
            className="form-item"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input onChange={(e) => handleChange('description', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Contact"
            name="contact"
            initialValue={applicationData.contact}
            className="form-item"
          >
            <Input onChange={(e) => handleChange('contact', e.target.value)} />
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item
            label="Type"
            name="type"
            initialValue={applicationData.type}
            className="form-item"
          >
            <Select onChange={(value) => handleChange('type', value)}>
              <Option value="Create">Create</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            className="form-item"
          >
            <DatePicker onChange={(date) => handleChange('date', date)} />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Application;
