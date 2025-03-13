import React, { useState } from 'react';
import { Form, Input, Button, Upload, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { createJob } from '../actions/jobActions';
import { UploadOutlined } from '@ant-design/icons';
import './JobSection.css';

const JobSection = ({ componentId, setIsJobsSubmitted }) => {
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState({
    executionTime: '',
    frequency: '',
    cpu: '',
    memory: '',
    serviceName: '',
  });
  const [manifestFile, setManifestFile] = useState(null);
  const [form] = Form.useForm(); 

  if (!componentId) {
    return <p style={{ color: 'red' }}>Please select or add a component first.</p>;
  }

  const handleFileChange = (info) => {
    setManifestFile(info.file);
  };

  const handleJobSubmit = () => {
    const formData = new FormData();
    formData.append('manifest', manifestFile);
    formData.append('executionTime', jobData.executionTime);
    formData.append('frequency', jobData.frequency);
    formData.append('cpu', jobData.cpu);
    formData.append('memory', jobData.memory);
    formData.append('serviceName', jobData.serviceName);

    dispatch(createJob({ formData, componentId }))
      .then(() => {
        setIsJobsSubmitted(true);
        notification.success({
          message: 'Job Added Successfully',
          description: 'The job has been added to the selected component.',
        });

        // Reset form after submission
        setJobData({
          executionTime: '',
          frequency: '',
          cpu: '',
          memory: '',
          serviceName: '',
        });
        setManifestFile(null);
        form.resetFields();
      })
      .catch(() => {
        notification.error({
          message: 'Error Adding Job',
          description: 'There was an error adding the job. Please try again.',
        });
      });
  };

  const handleChange = (field, value) => {
    setJobData({ ...jobData, [field]: value });
  };

  return (
    <div className="job-section">
      <h5>Job</h5>

      {/* Upload component for manifest file */}
      <Upload beforeUpload={() => false} onChange={handleFileChange} fileList={manifestFile ? [manifestFile] : []}>
        <Button icon={<UploadOutlined />}>Upload Manifest</Button>
      </Upload>

      {/* Form for job details */}
      <Form layout="vertical" onFinish={handleJobSubmit} form={form}>
        <Form.Item label="Execution Time*" name="executionTime" rules={[{ required: true, message: 'Required!' }]}>
          <Input value={jobData.executionTime} onChange={(e) => handleChange('executionTime', e.target.value)} />
        </Form.Item>
        <Form.Item label="Frequency*" name="frequency" rules={[{ required: true, message: 'Required!' }]}>
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

        <Button type="primary" htmlType="submit">Add New Job</Button>
      </Form>
    </div>
  );
};

export default JobSection;
