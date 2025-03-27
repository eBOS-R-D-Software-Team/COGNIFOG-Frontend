import React from 'react';
import './InfrastructureTable.css';

const InfrastructureTable = ({ data }) => {
  const rows = [];

  Object.entries(data).forEach(([clusterKey, cluster]) => {
    Object.entries(cluster.nodes).forEach(([nodeName, node]) => {
      rows.push({
        nodeName,
        type: node.id,
        staticMetric: node.resources.memoryInBytes,
        dynamicMetric: node.available_resources.memoryInBytes,
        cpuArchitecture: node.cpuArchitecture,
      });
    });
  });

  return (
    <div className="infra-table-container">
      <h3 className="infra-title">Infrastructure</h3>
      <table className="infra-table">
        <thead>
          <tr>
            <th>Node name</th>
            <th>Type</th>
            <th>Static Metrics</th>
            <th>Dynamic Metrics</th>
            <th>CPU Architecture</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.nodeName}</td>
              <td>{row.type}</td>
              <td>{formatBytes(row.staticMetric)}</td>
              <td>{formatBytes(row.dynamicMetric)}</td>
              <td>{row.cpuArchitecture}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default InfrastructureTable;
