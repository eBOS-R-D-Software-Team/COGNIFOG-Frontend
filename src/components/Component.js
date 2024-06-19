// src/components/ComponentSection.js
import React from 'react';
import { Form, Input, Button } from 'antd';
import './Component.css';

const ComponentSection = () => {
  return (
    <div className="component-section">
      <h4>Component</h4>
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input value="Consumer" />
        </Form.Item>
        <div className="job-section">
          <h5>Job</h5>
          <Button className="upload-button">Upload file</Button>
          <Form.Item label="Manifest">
            <Input />
          </Form.Item>
          <div className="form-row">
            <Form.Item label="Execution time*" className="form-item">
              <Input value="500 ms" />
            </Form.Item>
            <Form.Item label="Frequency*" className="form-item">
              <Input value="1" />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item label="CPU" className="form-item">
              <Input value="250m" />
            </Form.Item>
            <Form.Item label="Memory" className="form-item">
              <Input value="64Mi" />
            </Form.Item>
          </div>
          <Form.Item label="Service Name">
            <Input value="service" />
          </Form.Item>
          <div className="button-container">
            <Button type="primary" className="add-job-button">Add New Job</Button>
          </div>
        </div>
        <div className="button-container">
          <Button type="primary" className="add-component-button">Add New Component</Button>
        </div>
      </Form>
    </div>
  );
};

export default ComponentSection;
