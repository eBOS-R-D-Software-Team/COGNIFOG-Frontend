import React, { useState, useEffect } from 'react'; 
import { Form, Select, Input, DatePicker, Button, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { createApplication } from '../actions/applicationactions';
import './Application.css';

const { Option } = Select;

const Application = ({ setApplicationId, isUpdate = false, initialData = {}, onClose }) => {
  const dispatch = useDispatch();

  const [applicationData, setApplicationData] = useState({
    applicationName: initialData.applicationName || '',
    description: initialData.description || '',
    trial: initialData.trial || '',
    responsible: initialData.responsible || '',
    contact: initialData.contact || '',
    type: initialData.type || '',
    date: initialData.date || null,
  });

  useEffect(() => {
    setApplicationData({
      applicationName: initialData.applicationName || '',
      description: initialData.description || '',
      trial: initialData.trial || '',
      responsible: initialData.responsible || '',
      contact: initialData.contact || '',
      type: initialData.type || '',
      date: initialData.date || null,
    });
  }, [initialData]);

  const handleChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (values) => {
    if (isUpdate) {
      console.log("application information updated", values);
      notification.success({
        message: 'Application Updated Successfully',
        description: 'The application information has been updated.',
      });
      if (onClose) onClose();
    } else {
      const payload = {
        applicationName: values.applicationName,
        description: values.description,
      };
      dispatch(createApplication(payload))
        .then((response) => {
          const applicationId = response.payload.id;
          if (setApplicationId) setApplicationId(applicationId);
          notification.success({
            message: 'Application Added Successfully',
            description: 'The application has been successfully created.',
          });
          if (onClose) onClose();
        })
        .catch(() => {
          notification.error({
            message: 'Error Adding Application',
            description: 'There was an error adding the application. Please try again.',
          });
        });
    }
  };

  return (
    <div className="application-section">
      <h4>{isUpdate ? "Update Application Information" : "Application"}</h4>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          applicationName: applicationData.applicationName,
          description: applicationData.description,
          trial: applicationData.trial,
          ...(!isUpdate && {
            responsible: applicationData.responsible,
            contact: applicationData.contact,
            type: applicationData.type,
            date: applicationData.date,
          }),
        }}
      >
        {/* Common Field: Trial */}
        <div className="form-row">
          <Form.Item label="Select Trial" name="trial" className="form-item">
            <Select onChange={(value) => handleChange('trial', value)}>
              <Option value="THALES">THALES</Option>
            </Select>
          </Form.Item>
        </div>
        {isUpdate ? (
          // Update Mode: Only Application Name and Description
          <>
            <div className="form-row">
              <Form.Item
                label="Application Name"
                name="applicationName"
                className="form-item"
                rules={[{ required: true, message: 'Please input the application name!' }]}
              >
                <Input onChange={(e) => handleChange('applicationName', e.target.value)} />
              </Form.Item>
            </div>
            <div className="form-row">
              <Form.Item
                label="Description"
                name="description"
                className="form-item"
                rules={[{ required: true, message: 'Please input the description!' }]}
              >
                <Input onChange={(e) => handleChange('description', e.target.value)} />
              </Form.Item>
            </div>
          </>
        ) : (
          // Create Mode: Original layout with all fields
          <>
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
          </>
        )}
        <Button type="primary" htmlType="submit">
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default Application;
