// src/components/Sidebar.js
import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  BarChartOutlined,
  LineChartOutlined,
  DatabaseOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: <Link to="/home">Home</Link>,
  },
  {
    key: 'model',
    icon: <BarChartOutlined />,
    label: <Link to="/model">Model Visualization</Link>,
  },
  {
    key: 'data',
    icon: <LineChartOutlined />,
    label: <Link to="/data">Data Visualization</Link>,
  },
  {
    key: 'monitoring',
    icon: <DatabaseOutlined />,
    label: <Link to="/monitoring">Monitoring</Link>,
  },
  {
    key: 'service',
    icon: <FileTextOutlined />,
    label: <Link to="/service-request">Service Request</Link>,
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Menu mode="vertical" style={{ height: '100%', borderRight: 0, backgroundColor:'#2E2C74'}} items={menuItems} />
    </div>
  );
};

export default Sidebar;
