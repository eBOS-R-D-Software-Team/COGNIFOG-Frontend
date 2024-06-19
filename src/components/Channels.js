// src/components/Channels.js
import React from 'react';
import { Form, Select, Button } from 'antd';
import './Channels.css';

const { Option } = Select;

const Channels = () => {
  return (
    <div className="channels-section">
      <h4>Channels</h4>
      <Form layout="vertical">
        <div className="form-row">
          <Form.Item label="Outgoing" className="form-item">
            <Select defaultValue="Consumer">
              <Option value="Consumer">Consumer</Option>
              <Option value="Producer">Producer</Option>
              <Option value="App C">App C</Option>
              <Option value="App D">App D</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Incoming" className="form-item">
            <Select defaultValue="Consumer">
              <Option value="Consumer">Consumer</Option>
              <Option value="Producer">Producer</Option>
              <Option value="App C">App C</Option>
              <Option value="App D">App D</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="button-container">
          <Button type="primary" className="add-channels-button">Add New Channels</Button>
        </div>
      </Form>
    </div>
  );
};

export default Channels;
