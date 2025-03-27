// In ApplicationTable.js
import React, { useEffect, useState } from "react";
import { Table, Button, Spin, Alert, Empty, Popconfirm, message, Dropdown, Menu, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllApplicationsDetails, deleteApplication } from "../actions/applicationactions";
import { useNavigate } from "react-router-dom";
import Application from './Application'; // For updating application info
import UpdateComponentModal from './UpdateComponentModal'; // New modal component for updating components
import "./ApplicationTable.css";

const ApplicationTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applications, loading, error } = useSelector((state) => state.applications);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // State for Update Component Modal: now we store all components for the selected application
  const [isUpdateComponentModalVisible, setIsUpdateComponentModalVisible] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);

  useEffect(() => {
    dispatch(fetchAllApplicationsDetails());
  }, [dispatch]);

  // Delete handler (unchanged)
  const handleDelete = (id) => {
    dispatch(deleteApplication(id))
      .unwrap()
      .then(() => {
        message.success("Application deleted successfully");
      })
      .catch((error) => {
        message.error("Failed to delete application: " + error);
      });
  };

  // For updating application information
  const handleUpdateInfo = (record) => {
    setSelectedRecord(record);
    setIsUpdateModalVisible(true);
  };

  // For updating components: pass all components to the modal
  const handleUpdateComponent = (record) => {
    if (record.components && record.components.length > 0) {
      setSelectedComponents(record.components);
      setIsUpdateComponentModalVisible(true);
    } else {
      message.warning("No component available to update.");
    }
  };

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
        record.components
          ? record.components.reduce((total, comp) => total + (comp.jobs ? comp.jobs.length : 0), 0)
          : 0,
    },
    {
      title: "Total Channels",
      key: "channelsCount",
      render: (_, record) => (record.channels ? record.channels.length : 0),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const updateMenu = (
          <Menu>
            <Menu.Item key="info" onClick={() => handleUpdateInfo(record)}>
              Update Application Information
            </Menu.Item>
            <Menu.Item key="components" onClick={() => handleUpdateComponent(record)}>
              Update Components
            </Menu.Item>
            <Menu.Item key="channels" onClick={() => navigate(`/applications/update/channels/${record.applicationId}`)}>
              Update Channels
            </Menu.Item>
          </Menu>
        );

        return (
          <div className="table-buttons">
            <Button
              type="primary"
              className="details-btn"
              onClick={() => navigate(`/applications/${record.applicationId}`)}
            >
              Details
            </Button>
            <Dropdown overlay={updateMenu}>
              <Button type="default" className="update-btn">
                Update
              </Button>
            </Dropdown>
            <Popconfirm
              title="Are you sure to delete this application?"
              onConfirm={() => handleDelete(record.applicationId)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger className="delete-btn">
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <div className="application-table-container">
      <h2 className="table-title">📊 Application Overview</h2>
      
      {applications && applications.length === 0 ? (
        <div className="no-data-container">
          <Empty description="No Applications Available" />
        </div>
      ) : (
        <Table 
          columns={columns} 
          dataSource={applications} 
          rowKey="applicationId" 
          pagination={{ pageSize: 5 }} 
        />
      )}

      {/* Modal for updating application information */}
      <Modal
        title="Update Application Information"
        visible={isUpdateModalVisible}
        footer={null}
        onCancel={() => {
          setIsUpdateModalVisible(false);
          setSelectedRecord(null);
        }}
      >
        {selectedRecord && (
          <Application 
            isUpdate={true}
            initialData={{
              applicationName: selectedRecord.applicationName,
              description: selectedRecord.description,
              trial: selectedRecord.trial,
              responsible: selectedRecord.responsible,
              contact: selectedRecord.contact,
              type: selectedRecord.type,
              date: selectedRecord.date,
            }}
            onClose={() => {
              setIsUpdateModalVisible(false);
              setSelectedRecord(null);
            }}
          />
        )}
      </Modal>

      {/* Modal for updating components */}
      {isUpdateComponentModalVisible && selectedComponents && selectedComponents.length > 0 && (
        <UpdateComponentModal 
          visible={isUpdateComponentModalVisible}
          onClose={() => {
            setIsUpdateComponentModalVisible(false);
            setSelectedComponents([]);
          }}
          components={selectedComponents}
        />
      )}
    </div>
  );
};

export default ApplicationTable;
