import React from 'react';
import ClusterDiagram from '../components/ClusterDiagram';
import InfrastructureTable from '../components/InfrastructureTable';
import clusterData from '../data/nodes.json';
import "../design/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="table-section">
        <InfrastructureTable data={clusterData} />
      </div>
      <div className="diagram-section">
        <ClusterDiagram data={clusterData} />
      </div>
    </div>
  );
};

export default Dashboard;
