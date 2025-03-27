import React, { useState, useMemo } from "react";
import "../design/MonitoringManager.css";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import monitoringData from "../data/nodes.json";
import { useNavigate } from "react-router-dom";



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        boxWidth: 12,
        font: { size: 12 },
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 12 } },
    },
    y: {
      beginAtZero: true,
      grid: { color: "#e5e7eb" },
      ticks: { stepSize: 20, font: { size: 12 } },
    },
  },
  barThickness: 35,
};

const MonitoringManager = () => {
  const navigate = useNavigate();
  const [modelName, setModelName] = useState("THALES");
  const [description, setDescription] = useState(
    "Orchestrated nodes and microservices, ensuring precise coordination and cyber-protection for crisis management scenarios."
  );
  const [selectedMaster, setSelectedMaster] = useState("master1");

  const { cpuData, memoryData, storageData } = useMemo(() => {
    const nodes = monitoringData[selectedMaster]?.nodes || {};
    const labels = Object.keys(nodes);
    const cpuUsage = labels.map(() => Math.floor(Math.random() * 100)); // Placeholder for real CPU
    const memoryUsage = labels.map((nodeName) => {
      const node = nodes[nodeName];
      const used = node.resources.memoryInBytes - node.available_resources.memoryInBytes;
      const total = node.resources.memoryInBytes;
      return Math.round((used / total) * 100);
    });
    const storageUsage = labels.map(() => Math.floor(Math.random() * 100)); // Placeholder
    


    return {
      cpuData: {
        labels,
        datasets: [
          {
            label: "CPU Usage (%)",
            data: cpuUsage,
            backgroundColor: cpuUsage.map((val) =>
              val > 70 ? "red" : val > 40 ? "orange" : "green"
            ),
          },
        ],
      },
      memoryData: {
        labels,
        datasets: [
          {
            label: "Memory Usage (%)",
            data: memoryUsage,
            backgroundColor: memoryUsage.map((val) =>
              val > 70 ? "red" : val > 40 ? "orange" : "green"
            ),
          },
        ],
      },
      storageData: {
        labels,
        datasets: [
          {
            label: "Storage Usage (%)",
            data: storageUsage,
            backgroundColor: storageUsage.map((val) =>
              val > 70 ? "red" : val > 40 ? "orange" : "green"
            ),
          },
        ],
      },
    };
  }, [selectedMaster]);

  return (
    <>
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
          rows={3}
        />
        <div className="dropdown">
          <label>Master:</label>
          <select value={selectedMaster} onChange={(e) => setSelectedMaster(e.target.value)}>
            {Object.keys(monitoringData).map((master) => (
              <option key={master} value={master}>
                {master}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>CPU</h3>
          <div className="chart-wrapper">
            <Bar data={cpuData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Memory</h3>
          <div className="chart-wrapper">
            <Bar data={memoryData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Storage</h3>
          <div className="chart-wrapper">
            <Doughnut data={storageData} options={chartOptions} />
          </div>
        </div>
      </div>
      <div className="infrastructure-button-container">
  <button className="infrastructure-button" onClick={() => navigate("/dashboard")}>
    Infrastructure Details
  </button>
</div>
    </div>
      <div className="infrastructure-button-container">
      <button className="infrastructure-button" onClick={() => navigate("/dashboard")}>
        Infrastructure Details
      </button>
    </div> </>
  );
};

export default MonitoringManager;
