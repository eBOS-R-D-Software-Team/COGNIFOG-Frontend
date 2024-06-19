// src/components/Application.js
import React from 'react';
import { Form, Select, Input, DatePicker } from 'antd';
import moment from 'moment';
import './Application.css';

const { Option } = Select;

const Application = () => {
  return (
    <div className="application-section">
      <h4>Application</h4>
      <Form layout="vertical">
        <div className="form-row">
          <Form.Item label="Select Trial" className="form-item">
            <Select defaultValue="THALES">
              <Option value="THALES">THALES</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item label="Application Name" className="form-item">
            <Input value="hello-world-multipart" />
          </Form.Item>
          <Form.Item label="Responsible" className="form-item">
            <Input value="Kyriaki Psara" />
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item label="Description" className="form-item">
            <Input value="Flood in Paris" />
          </Form.Item>
          <Form.Item label="Contact" className="form-item">
            <Input value="KyriakiP@ebos.com.cy" />
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item label="Type" className="form-item">
            <Select defaultValue="Create">
              <Option value="Create">Create</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" className="form-item">
            <DatePicker defaultValue={moment('2024-03-04', 'YYYY-MM-DD')} />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Application;
