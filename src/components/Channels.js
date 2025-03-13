import React, { useEffect, useState } from 'react';
import { Form, Select, Button, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { createChannel } from '../actions/channelActions'; // Import the action to create a channel
import './Channels.css';

const { Option } = Select;

const ChannelsSection = ({ components, setIsChannelsSubmitted, applicationId }) => {
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
    console.log("Creating Channel with:", applicationId, incomingComponentId, outgoingComponentId); // 🔍 Debugging log
    if (incomingComponentId && outgoingComponentId && applicationId) {
      dispatch(createChannel({ 
        applicationId,  
        incomingComponentId, 
        outgoingComponentId 
      }))
        .then(() => {
          console.log("Channel successfully created!"); // ✅ Confirm API success
          setIsChannelsSubmitted(true); 
          notification.success({
            message: 'Channel Added Successfully',
            description: 'The channel has been successfully created.',
          });
        })
        .catch(error => {
          console.error("Error creating channel:", error); // ❌ Debug any failures
          notification.error({
            message: 'Failed to Add Channel',
            description: error.message || 'Something went wrong!',
          });
        });
    } else {
      console.warn("Missing values:", { applicationId, incomingComponentId, outgoingComponentId }); // 🔍 Check for missing values
      notification.warning({
        message: 'Missing Required Fields',
        description: 'Please select both incoming and outgoing components.',
      });
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
