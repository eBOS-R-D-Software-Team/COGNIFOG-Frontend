// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import { Provider } from 'react-redux';
import 'antd/dist/reset.css';  // Import Ant Design CSS
import './index.css';  // Custom global styles
import store from './store';
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider> 
);
