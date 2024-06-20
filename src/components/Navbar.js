// src/components/Navbar.js
import React from 'react';
import { Input, Menu } from 'antd';
import { SettingOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import './Navbar.css';

const { Search } = Input;

const menuItems = [
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '',
  },
  {
    key: 'notifications',
    icon: <BellOutlined />,
    label: '',
  },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: '',
  },
];

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={require('../images/logo.png')} alt="Logo" />
        <h2 className="m-0">COGNIFOG</h2>
      </div>
      <div className="search-bar">
        <Search placeholder="Search..." className="input-primary" />
      </div>
      <div className="menu">
        <Menu mode="horizontal" items={menuItems} />
      </div>
    </div>
  );
};

export default Navbar;
