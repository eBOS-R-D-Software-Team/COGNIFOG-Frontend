import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, List, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// If you don't have custom styles yet, you can remove or comment out the CSS import.
// import './UpdateComponentModal.css';

const { Option } = Select;

const UpdateComponentModal = ({ visible, onClose, components = [] }) => {
  // components: an array of component objects; each should have id, name, and jobs (an array)
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [componentName, setComponentName] = useState('');
  
  // State for new job form
  const [jobForm] = Form.useForm();
  const [jobData, setJobData] = useState({
    executionTime: '',
    frequency: '',
    cpu: '',
    memory: '',
    serviceName: '',
  });
  const [manifestFile, setManifestFile] = useState(null);

  // When the list of components changes, select the first one by default (if available)
  useEffect(() => {
    if (components && components.length > 0) {
      setSelectedComponent(components[0]);
      setComponentName(components[0].name);
    } else {
      setSelectedComponent(null);
    }
  }, [components]);

  // Handle dropdown selection change
  const handleComponentSelect = (componentId) => {
    const comp = components.find((c) => c.id === componentId);
    setSelectedComponent(comp);
    setComponentName(comp.name);
  };

  // Handler for updating the component name
  const handleUpdateComponentName = () => {
    console.log('Updating component name:', componentName, 'for component id:', selectedComponent.id);
    notification.success({
      message: 'Component Updated',
      description: 'Component name updated successfully.',
    });
    // Simulate the update by updating local state
    setSelectedComponent({ ...selectedComponent, name: componentName });
  };

  // Handler for deleting a job
  const handleDeleteJob = (jobId) => {
    console.log('Deleting job with id:', jobId, 'from component id:', selectedComponent.id);
    notification.success({
      message: 'Job Deleted',
      description: `Job with id ${jobId} deleted successfully.`,
    });
    // Simulate deletion by removing the job from the local component state
    const updatedJobs = (selectedComponent.jobs || []).filter((job) => job.id !== jobId);
    setSelectedComponent({ ...selectedComponent, jobs: updatedJobs });
  };

  // For file upload in the new job form
  const handleFileChange = (info) => {
    setManifestFile(info.file);
  };

  // Handler for adding a new job
  const handleAddJob = () => {
    console.log('Adding new job to component id:', selectedComponent.id, {
      ...jobData,
      manifestFile,
    });
    notification.success({
      message: 'Job Added',
      description: 'New job added successfully.',
    });
    // Simulate adding the job: generate a new job with an id and add it to the jobs list
    const newJob = { ...jobData, id: Date.now() };
    const updatedJobs = [...(selectedComponent.jobs || []), newJob];
    setSelectedComponent({ ...selectedComponent, jobs: updatedJobs });
    // Reset the new job form state
    setJobData({
      executionTime: '',
      frequency: '',
      cpu: '',
      memory: '',
      serviceName: '',
    });
    setManifestFile(null);
    jobForm.resetFields();
  };

  // Update new job field values
  const handleJobFieldChange = (field, value) => {
    setJobData({ ...jobData, [field]: value });
  };

  return (
    <Modal
      title="Update Components"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Select Component">
          <Select 
            value={selectedComponent ? selectedComponent.id : undefined}
            onChange={handleComponentSelect}
          >
            {components.map((comp) => (
              <Option key={comp.id} value={comp.id}>
                {comp.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      {selectedComponent && (
        <>
          <Form layout="vertical">
            <Form.Item label="Component Name">
              <Input 
                value={componentName} 
                onChange={(e) => setComponentName(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleUpdateComponentName}>
                Update Component Name
              </Button>
            </Form.Item>
          </Form>

          <hr />

          <h5>Jobs</h5>
          {selectedComponent.jobs && selectedComponent.jobs.length > 0 ? (
            <List
              dataSource={selectedComponent.jobs}
              renderItem={(job) => (
                <List.Item
                  actions={[
                    <Button danger onClick={() => handleDeleteJob(job.id)}>
                      Delete
                    </Button>
                  ]}
                >
                  <List.Item.Meta 
                    title={job.serviceName || 'Job'}
                    description={`Execution Time: ${job.executionTime}, Frequency: ${job.frequency}`}
                  />
                </List.Item>
              )}
            />
          ) : (
            <p>No jobs available.</p>
          )}

          <hr />

          <h5>Add New Job</h5>
          <Upload 
            beforeUpload={() => false} 
            onChange={handleFileChange} 
            fileList={manifestFile ? [manifestFile] : []}
          >
            <Button icon={<UploadOutlined />}>Upload Manifest</Button>
          </Upload>
          <Form layout="vertical" form={jobForm} onFinish={handleAddJob}>
            <Form.Item label="Execution Time*" name="executionTime" rules={[{ required: true, message: 'Required!' }]}>
              <Input 
                value={jobData.executionTime} 
                onChange={(e) => handleJobFieldChange('executionTime', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Frequency*" name="frequency" rules={[{ required: true, message: 'Required!' }]}>
              <Input 
                value={jobData.frequency} 
                onChange={(e) => handleJobFieldChange('frequency', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="CPU" name="cpu">
              <Input 
                value={jobData.cpu} 
                onChange={(e) => handleJobFieldChange('cpu', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Memory" name="memory">
              <Input 
                value={jobData.memory} 
                onChange={(e) => handleJobFieldChange('memory', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Service Name" name="serviceName">
              <Input 
                value={jobData.serviceName} 
                onChange={(e) => handleJobFieldChange('serviceName', e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Add New Job</Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
};

export default UpdateComponentModal;
