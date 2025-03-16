import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Collapse, Card, Typography, Divider, Button } from "antd";
import "./ApplicationDetails.css";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const { applications, loading, error } = useSelector((state) => state.applications);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisImageUrl, setAnalysisImageUrl] = useState(null);

  // Find the application by ID; ensure applications is an array.
  const application = Array.isArray(applications)
    ? applications.find((app) => app.applicationId === applicationId)
    : null;

  // Helper function to convert the manifest file's data array into a string.
  const parseManifest = (manifestFile) => {
    if (!manifestFile || !manifestFile.data) return "";
    return String.fromCharCode(...manifestFile.data);
  };

  // When analysis results are shown and the file is available, convert file data to a Blob URL.
  useEffect(() => {
    if (
      showAnalysis &&
      application &&
      application.analysisResult &&
      application.analysisResult.file &&
      application.analysisResult.file.data
    ) {
      const uint8Arr = new Uint8Array(application.analysisResult.file.data);
      const mimeType = `image/${application.analysisResult.fileExtension}`;
      const blob = new Blob([uint8Arr], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setAnalysisImageUrl(url);

      // Cleanup the URL when component unmounts or dependencies change.
      return () => URL.revokeObjectURL(url);
    }
  }, [showAnalysis, application]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!application) {
    return <div className="not-found">Application not found</div>;
  }

  return (
    <div className="application-details-container">
      <Title className="title" level={2}>Application Details</Title>
      <Card
        className="application-card"
        extra={
          <Button
            type="default"
            className="analysis-btn"
            onClick={() => setShowAnalysis(true)}
          >
            View Analysis Results
          </Button>
        }
      >
        <div className="detail-item">
          <Text strong>Application Name:</Text> <Text>{application.applicationName}</Text>
        </div>
        <Divider />
        {application.components && application.components.length > 0 && (
          <div className="components-section">
            <Title className="title" level={4}>Components</Title>
            <Collapse accordion>
              {application.components.map((component) => (
                <Panel header={component.name} key={component.id}>
                  <div className="component-detail">
                    <div className="detail-item">
                      <Text strong>Component ID:</Text> <Text>{component.id}</Text>
                    </div>
                    {component.jobs && component.jobs.length > 0 && (
                      <Collapse className="jobs-collapse">
                        <Panel header="Jobs" key="jobs">
                          {component.jobs.map((job) => (
                            <Card
                              key={job.id}
                              className="job-card"
                              type="inner"
                              title={job.serviceName}
                            >
                              <div className="detail-item">
                                <Text strong>Job ID:</Text> <Text>{job.id}</Text>
                              </div>
                              <div className="detail-item">
                                <Text strong>Manifest Name:</Text> <Text>{job.manifestName}</Text>
                              </div>
                              <div className="detail-item">
                                <Text strong>Execution Time:</Text> <Text>{job.executionTime}</Text>
                              </div>
                              <div className="detail-item">
                                <Text strong>Frequency:</Text> <Text>{job.frequency}</Text>
                              </div>
                              <div className="detail-item">
                                <Text strong>CPU:</Text> <Text>{job.cpu}</Text>
                              </div>
                              <div className="detail-item">
                                <Text strong>Memory:</Text> <Text>{job.memory}</Text>
                              </div>
                              <div className="manifest-section">
                                <Text strong>Manifest File:</Text>
                                <pre className="yaml-code">
                                  {parseManifest(job.manifestFile)}
                                </pre>
                              </div>
                            </Card>
                          ))}
                        </Panel>
                      </Collapse>
                    )}
                  </div>
                </Panel>
              ))}
            </Collapse>
          </div>
        )}
        {application.channels && application.channels.length > 0 && (
          <>
            <Divider />
            <div className="channels-section">
              <Title level={4}>Channels</Title>
              <Collapse>
                <Panel header="Channels List" key="channels">
                  {application.channels.map((channel) => (
                    <Card key={channel.id} className="channel-card" type="inner">
                      <div className="detail-item">
                        <Text strong>Channel ID:</Text> <Text>{channel.id}</Text>
                      </div>
                      <div className="detail-item">
                        <Text strong>Incoming Component ID:</Text> <Text>{channel.incomingComponentId}</Text>
                      </div>
                      <div className="detail-item">
                        <Text strong>Outgoing Component ID:</Text> <Text>{channel.outgoingComponentId}</Text>
                      </div>
                    </Card>
                  ))}
                </Panel>
              </Collapse>
            </div>
          </>
        )}
        {showAnalysis && application.analysisResult && (
          <>
            <Divider />
            <div className="analysis-section">
              <Title level={4}>Analysis Results</Title>
              <div className="detail-item">
                <Text strong>Consistency:</Text> <Text>{application.analysisResult.consistency}</Text>
              </div>
              <div className="detail-item">
                <Text strong>Liveness:</Text> <Text>{application.analysisResult.liveness}</Text>
              </div>
              <div className="detail-item">
                <Text strong>File Name:</Text> <Text>{application.analysisResult.fileName}</Text>
              </div>
              <div className="detail-item">
                <Text strong>File Extension:</Text> <Text>{application.analysisResult.fileExtension}</Text>
              </div>
              <div className="image-preview">
                {analysisImageUrl ? (
                  <img src={analysisImageUrl} alt="Analysis Result" style={{ maxWidth: '100%' }} />
                ) : (
                  <Text>Loading image...</Text>
                )}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ApplicationDetails;
