// src/components/ChannelsSection.js
import React, { useEffect, useState } from 'react';
import { Form, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createChannel } from '../actions/channelActions'; // Import the action to create a channel
import './Channels.css';

const { Option } = Select;

const ChannelsSection = ({ components }) => {
  const dispatch = useDispatch();
  const [incomingComponentId, setIncomingComponentId] = useState(null);
  const [outgoingComponentId, setOutgoingComponentId] = useState(null);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(0); // Track the current pairing index

  useEffect(() => {
    if (components.length >= 2) {
      setIncomingComponentId(components[selectedComponentIndex]?.id);
      setOutgoingComponentId(components[selectedComponentIndex + 1]?.id);
    }
  }, [components, selectedComponentIndex]);

  const handleCreateChannel = () => {
    if (incomingComponentId && outgoingComponentId) {
      dispatch(createChannel({ incomingComponentId, outgoingComponentId }));
    }
  };

  const handleIndexChange = () => {
    const newIndex = (selectedComponentIndex + 2) % components.length;
    setSelectedComponentIndex(newIndex);
  };

  return (
    <div className="channels-section">
      <h5>Channels</h5>
      <Form layout="vertical" onFinish={handleCreateChannel}>
        <Form.Item label="Incoming Component" required>
          <Select
            value={incomingComponentId}
            onChange={setIncomingComponentId}
            disabled={components.length < 2}
          >
            {components.map((component) => (
              <Option key={component.id} value={component.id}>
                {component.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Outgoing Component" required>
          <Select
            value={outgoingComponentId}
            onChange={setOutgoingComponentId}
            disabled={components.length < 2}
          >
            {components.map((component) => (
              <Option key={component.id} value={component.id}>
                {component.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" className="add-channel-button" disabled={components.length < 2}>
          Add Channel
        </Button>
        <Button type="link" onClick={handleIndexChange} disabled={components.length < 3}>
          Switch Components
        </Button>
      </Form>
    </div>
  );
};

export default ChannelsSection;
