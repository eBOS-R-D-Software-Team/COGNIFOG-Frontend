import React, { useState } from 'react';
import { Form, Input, Button, Upload, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { createJob } from '../actions/jobActions';
import { UploadOutlined } from '@ant-design/icons';
import './JobSection.css';

const JobSection = ({ componentId }) => {
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState({
    executionTime: '',
    frequency: '',
    cpu: '',
    memory: '',
    serviceName: '',
  });
  const [manifestFile, setManifestFile] = useState(null);
  const [form] = Form.useForm(); // Ant Design's form instance for resetting

  // Handle file selection from the upload
  const handleFileChange = (info) => {
    setManifestFile(info.file); // Store the file for form submission
  };

  // Handle form submission for the job
  const handleJobSubmit = () => {
    const formData = new FormData();
    formData.append('manifest', manifestFile); // Append file
    formData.append('executionTime', jobData.executionTime);
    formData.append('frequency', jobData.frequency);
    formData.append('cpu', jobData.cpu);
    formData.append('memory', jobData.memory);
    formData.append('serviceName', jobData.serviceName);

    // Dispatch the job creation action with formData and componentId
    dispatch(createJob({ formData, componentId }))
      .then(() => {
        notification.success({
          message: 'Job Added Successfully',
          description: 'The job has been added to the component.',
        });
        // Reset form fields and file input after successful submission
        setJobData({
          executionTime: '',
          frequency: '',
          cpu: '',
          memory: '',
          serviceName: '',
        });
        setManifestFile(null);
        form.resetFields(); // Reset form fields
      })
      .catch((error) => {
        notification.error({
          message: 'Error Adding Job',
          description: 'There was an error adding the job. Please try again.',
        });
        console.error('Error creating job:', error);
      });
  };

  // Handle input field changes
  const handleChange = (field, value) => {
    setJobData({
      ...jobData,
      [field]: value,
    });
  };

  return (
    <div className="job-section">
      <h5>Job</h5>
      {/* Upload component for manifest file */}
      <Upload
        beforeUpload={() => false}
        onChange={handleFileChange}
        fileList={manifestFile ? [manifestFile] : []} // Bind fileList to clear file input
      >
        <Button icon={<UploadOutlined />}>Upload Manifest</Button>
      </Upload>
      {/* Form for job details */}
      <Form layout="vertical" onFinish={handleJobSubmit} form={form}>
        <Form.Item label="Execution time*" name="executionTime" required>
          <Input value={jobData.executionTime} onChange={(e) => handleChange('executionTime', e.target.value)} />
        </Form.Item>
        <Form.Item label="Frequency*" name="frequency" required>
          <Input value={jobData.frequency} onChange={(e) => handleChange('frequency', e.target.value)} />
        </Form.Item>
        <Form.Item label="CPU" name="cpu">
          <Input value={jobData.cpu} onChange={(e) => handleChange('cpu', e.target.value)} />
        </Form.Item>
        <Form.Item label="Memory" name="memory">
          <Input value={jobData.memory} onChange={(e) => handleChange('memory', e.target.value)} />
        </Form.Item>
        <Form.Item label="Service Name" name="serviceName">
          <Input value={jobData.serviceName} onChange={(e) => handleChange('serviceName', e.target.value)} />
        </Form.Item>
        {/* Submit button to add the job */}
        <Button type="primary" htmlType="submit" className="add-job-button">
          Add New Job
        </Button>
      </Form>
    </div>
  );
};

export default JobSection;
