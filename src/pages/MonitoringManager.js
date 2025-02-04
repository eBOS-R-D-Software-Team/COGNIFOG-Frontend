import React, { useState } from "react";
import "../design/MonitoringManager.css";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const MonitoringManager = () => {
  const [modelName, setModelName] = useState("THALES");
  const [description, setDescription] = useState("Orchestrated nodes and microservices, ensuring precise coordination and cyber-protection for crisis management scenarios.");

  const cpuData = {
    labels: ["Node 1", "Node 2", "Node 3", "Node 4", "Node 5", "Node 6"],
    datasets: [
      {
        label: "CPU Usage",
        data: [30, 45, 20, 75, 40, 15],
        backgroundColor: ["green", "orange", "green", "red", "orange", "green"],
      },
    ],
  };

  const memoryData = {
    labels: ["Node 1", "Node 2", "Node 3", "Node 4", "Node 5", "Node 6"],
    datasets: [
      {
        label: "Memory Usage",
        data: [80, 65, 50, 85, 55, 30],
        backgroundColor: ["orange", "orange", "orange", "red", "orange", "green"],
      },
    ],
  };

  const storageData = {
    labels: ["Node 1", "Node 2", "Node 3", "Node 4", "Node 5", "Node 6"],
    datasets: [
      {
        label: "Storage Usage",
        data: [20, 10, 15, 25, 18, 12],
        backgroundColor: ["blue", "red", "gray", "yellow", "green", "orange"],
      },
    ],
  };

  return (
    <div className="monitoring-container">
      <div className="header-section">
        <h2>Trial</h2>
        <h3>Application Deployment Model Description</h3>
        <input 
          type="text" 
          value={modelName} 
          onChange={(e) => setModelName(e.target.value)} 
          className="input-box" 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="description-box"
        />
      </div>
      <div className="charts-section">
        <div className="chart-card">
          <h3>CPU</h3>
          <Bar data={cpuData} />
        </div>
        <div className="chart-card">
          <h3>Memory</h3>
          <Bar data={memoryData} />
        </div>
        <div className="chart-card">
          <h3>Storage</h3>
          <Doughnut data={storageData} />
        </div>
      </div>
      <div className="network-visualization">
        <h3>Network Topology</h3>
        <img src="/network-diagram.png" alt="Network Topology" className="network-image" />
      </div>
    </div>
  );
};

export default MonitoringManager;
