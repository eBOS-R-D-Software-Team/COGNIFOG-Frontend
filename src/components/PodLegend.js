import React from 'react';
import {
  RadarChartOutlined,
  DeploymentUnitOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  DesktopOutlined,
  ThunderboltOutlined,
  SettingOutlined,
  SearchOutlined,
  LockOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import './PodLegend.css';

const PodLegend = () => {
  const legendMap = [
    { icon: <RadarChartOutlined />, label: "CoreDNS" },
    { icon: <DeploymentUnitOutlined />, label: "Traefik Ingress" },
    { icon: <LineChartOutlined />, label: "Grafana" },
    { icon: <AreaChartOutlined />, label: "Prometheus" },
    { icon: <DesktopOutlined />, label: "Node Exporter" },
    { icon: <ThunderboltOutlined />, label: "Kepler Exporter" },
    { icon: <SettingOutlined />, label: "Helm" },
    { icon: <SearchOutlined />, label: "Thanos Query" },
    { icon: <LockOutlined />, label: "Load Balancer" },
    { icon: <AppstoreOutlined />, label: "Other" },
  ];

  return (
    <div className="pod-legend-container">
      <h3 className="pod-legend-title">Pod Legend</h3>
      <div className="pod-legend-grid">
        {legendMap.map((item, index) => (
          <div className="legend-item" key={index}>
            <span className="legend-icon">{item.icon}</span>
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodLegend;
