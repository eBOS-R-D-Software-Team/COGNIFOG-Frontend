import React, { useEffect } from "react";
import { Table, Button, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllApplicationsDetails } from "../actions/applicationactions";
import { useNavigate } from "react-router-dom";
import "./ApplicationTable.css"; // ✅ Import the CSS file

const ApplicationTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applications, loading, error } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchAllApplicationsDetails());
  }, [dispatch]);

  console.log("📢 Applications Data Before Rendering:", applications);

  // ✅ Ensure applications is always an array
  const safeApplications = Array.isArray(applications) ? applications : [];

  const columns = [
    {
      title: "Application Name",
      dataIndex: "applicationName",
      key: "applicationName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Number of Components",
      key: "componentsCount",
      render: (_, record) => (record.components ? record.components.length : 0),
    },
    {
      title: "Total Jobs",
      key: "jobsCount",
      render: (_, record) =>
        record.components ? record.components.reduce((total, component) => total + (component.jobs ? component.jobs.length : 0), 0) : 0,
    },
    {
      title: "Total Channels",
      key: "channelsCount",
      render: (_, record) => (record.channels ? record.channels.length : 0),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="table-buttons">
          <Button
            type="primary"
            className="details-btn"
            onClick={() => navigate(`/applications/${record.applicationId}`)}
          >
            Details
          </Button>
          <Button
            type="default"
            className="update-btn"
            onClick={() => navigate(`/applications/update/${record.applicationId}`)}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <div className="application-table-container">
      <h2 className="table-title">📊 Application Overview</h2>
      <Table columns={columns} dataSource={safeApplications} rowKey="applicationId" pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ApplicationTable;
