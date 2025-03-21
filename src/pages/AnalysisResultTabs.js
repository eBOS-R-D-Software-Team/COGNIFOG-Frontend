// src/pages/AnalysisResultTabs.js
import React, { useState, useEffect } from 'react';
import { Tabs, Button, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalysisResult } from '../slices/analysisResultSlice';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getApplicationInformation } from '../actions/applicationactions';
import './AnalysisResultTabs.css';
import success from '../images/success.png';
import failure from '../images/failure.png';
import hardware from '../images/hardware.png';

const arrayBufferToBase64 = (bufferObj) => {
  if (!bufferObj || !bufferObj.data) return '';
  let binary = '';
  const bytes = new Uint8Array(bufferObj.data);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const AnalysisResultTabs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { applicationName, description } = location.state || {};
  const { applicationId } = useParams();

  const [activeTab, setActiveTab] = useState("1");

  const { data: analysisResult, loading, error } = useSelector(
    (state) => state.analysisResult || { data: null, loading: false, error: null }
  );

  useEffect(() => {
    if (applicationId) {
      dispatch(fetchAnalysisResult(applicationId));
    }
  }, [applicationId, dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    notification.success({
      message: 'Application Submitted',
      description: 'Application submitted successfully!',
    });
  };

  const renderDataflowTab = () => {
    let content;
    if (loading || error) {
      content = (
        <div className="loading-animation">
          <Spin />
          {error && <p>Waiting for analysis results...</p>}
        </div>
      );
    } else if (analysisResult && analysisResult.file) {
      const base64String = arrayBufferToBase64(analysisResult.file);
      const imageSrc = `data:${analysisResult.file.type};base64,${base64String}`;
      content = <img src={imageSrc} alt="Analysis Result" className="dataflow-image" />;
    } else {
      content = (
        <div className="loading-animation">
          <Spin />
          <p>Still waiting for Analysis Result</p>
        </div>
      );
    }
    return (
      <div className="tab-content">
        {content}
        <div className="button-group">
          <Button size="large" onClick={handleBack}>Back</Button>
          <Button size="large" onClick={() => setActiveTab("2")} type="primary">Next</Button>
        </div>
      </div>
    );
  };

  const renderSoftwareTab = () => {
    const livenessStatus = analysisResult && analysisResult.liveness;
    const consistencyStatus = analysisResult && analysisResult.consistency;

    return (
      <div className="tab-content">
        <div className="header-info">
          <div className="header-trial">Trial:</div>
          <div className="header-thales">Thales</div>
        </div>
        <div className="description-section">
          <div className="description-item">
            <span className="description-label">Application Name:</span>
            <span className="description-value">{applicationName ? applicationName : 'New Application'}</span>
          </div>
          <div className="description-item">
            <span className="description-label">Application Description:</span>
            <span className="description-value">
              {description
                ? description
                : 'New Description'}
            </span>
          </div>
        </div>
        <div className="status-section">
          <div className="status-item">
            <p className="status-text">Liveness Verification:</p>
            {livenessStatus ? (
              <img src={success} alt="Success" className="status-image" />
            ) : (
              <img src={failure} alt="Failure" className="status-image" />
            )}
          </div>
          <div className="status-item">
            <p className="status-text">Consistency Analysis:</p>
            {consistencyStatus ? (
              <img src={success} alt="Success" className="status-image" />
            ) : (
              <img src={failure} alt="Failure" className="status-image" />
            )}
          </div>
        </div>
        <div className="button-group">
          <Button size="large" onClick={() => setActiveTab("1")}>Back</Button>
          <Button size="large" onClick={() => setActiveTab("3")} type="primary">Next</Button>
        </div>
      </div>
    );
  };

  const renderHardwareTab = () => {
    return (
      <div className="tab-content">
        <div className="header-info">
          <div className="header-trial">Trial:</div>
          <div className="header-thales">Thales</div>
        </div>
        <div className="hardware-flex-container">
          <div className="infrastructure-card">
            <div className="infrastructure-title">Infrastructure</div>
            <table className="infrastructure-table">
              <thead>
                <tr>
                  <th>Node Name</th>
                  <th>Type</th>
                  <th>Static Metrics</th>
                  <th>Dynamic Metrics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Node 1</td>
                  <td>Type 1</td>
                  <td>Static Metric 1</td>
                  <td>Dynamic Metric 1</td>
                </tr>
                <tr>
                  <td>Node 2</td>
                  <td>Type 2</td>
                  <td>Static Metric 2</td>
                  <td>Dynamic Metric 2</td>
                </tr>
                <tr>
                  <td>Node 3</td>
                  <td>Type 3</td>
                  <td>Static Metric 3</td>
                  <td>Dynamic Metric 3</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="hardware-image-container">
            <img src={hardware} alt="Hardware" className="hardware-image" />
          </div>
        </div>
        <div className="button-group">
          <Button size="large" onClick={() => setActiveTab("2")}>Back</Button>
          <Button size="large" onClick={handleSubmit} type="primary">Submit</Button>
        </div>
      </div>
    );
  };

  const tabItems = [
    {
      key: "1",
      label: "Dataflow",
      children: renderDataflowTab(),
    },
    {
      key: "2",
      label: "Software",
      children: renderSoftwareTab(),
    },
    {
      key: "3",
      label: "Hardware",
      children: renderHardwareTab(),
    },
  ];

  return (
    <div className="analysis-result-tabs-container">
      <Tabs activeKey={activeTab} items={tabItems} onChange={(key) => setActiveTab(key)} />
    </div>
  );
};

export default AnalysisResultTabs;
