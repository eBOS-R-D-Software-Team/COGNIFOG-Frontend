import React, { useState } from 'react';
import { Card, Typography, Row, Col, Button, Modal } from 'antd';
import { CloudOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Box } from 'lucide-react';
import './ClusterDiagram.css';

const { Text } = Typography;

const podGroups = {
  Master1: {
    'k3s-master1': {
      'Cluster Manager': [
        'cluster-manager-85556664c9-shj3h',
        'cluster-manager-addon-controller-ff6dc4f65c-wxhm',
        'cluster-manager-agent-controller-7858c56696-h7z6v',
        'cluster-manager-registration-controller-2b8bcc94-jmlba',
        'cluster-manager-webhook-798d6455d5-xjgcq',
        'cluster-manager-work-webhook-6875c98d8-dnnt5',
      ],
      'Monitoring Agent': [
        'monitoring-agent-kepler-8gpsk',
        'monitoring-agent-kube-prom-blackbox-exporter-57c9b576c-ghqj',
        'monitoring-agent-kube-prometheus-operator-67f5b8f5d7-nhdc5',
        'monitoring-agent-kube-state-metrics-577fd5e85-zx224',
        'monitoring-agent-node-exporter-hb7cq',
      ],
      'Prometheus Monitoring': [
        'prometheus-monitoring-agent-kube-prom-prometheus-0',
        'prometheus-monitoring-agent-kube-prom-prometheus-1',
      ],
      'Service Load Balancer': [
        'svclb-traefik-19793550-qsgxr',
        'svclb-traefik-19793550-rlzlp',
      ],
    },
  },
  Master3: {
    'k3s-master3': {
      Helm: ['helm-install-traefik-crd-dmscd', 'helm-install-traefik-xqz8h'],
      Klusterlet: ['klusterlet-67d554b4df-828kk', 'klusterlet-67d554b4df-k8784'],
      'Monitoring Agent': ['monitoring-agent-kepler-n784z'],
      'Service Load Balancer': [
        'svclb-traefik-c87b32a3-fcnpg',
        'svclb-traefik-c87b32a3-trmpd',
      ],
    },
    'k3s-worker3-1': {
      'Pod Provisioning': [
        'local-path-provisioner-5c8f5d8df4-949wv',
        'metrics-server-5988cbc47d-sqm4z',
      ],
    },
  },
};

const ClusterDiagram = () => {
  const [selectedMaster, setSelectedMaster] = useState('Master1');
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    groupName: '',
    pods: [],
  });

  const handleGroupClick = (groupName, pods) => {
    setModalInfo({ visible: true, groupName, pods });
  };

  const handleClose = () => setModalInfo({ ...modalInfo, visible: false });

  const clusterData = podGroups[selectedMaster];

  return (
    <div className="diagram-container">
      <div className="toggle-dropdown">
  <label htmlFor="master-select" className="select-label">Master: </label>
  <select
    id="master-select"
    value={selectedMaster}
    onChange={(e) => setSelectedMaster(e.target.value)}
    className="master-select"
  >
    {Object.keys(podGroups).map((master) => (
      <option key={master} value={master}>
        {master}
      </option>
    ))}
  </select>
</div>


      <div className="tree-level cloud">
        <div className="circle-card">
          <CloudOutlined style={{ fontSize: 28, color: '#1890ff' }} />
          <Text>{selectedMaster}</Text>
        </div>
      </div>

      <div className="tree-connect">
        <div className="arrow-down"></div>
      </div>

      <div className="tree-level nodes">
        {Object.entries(clusterData).map(([nodeId, groups]) => (
          <div key={nodeId} className="circle-card node-card">
            <DatabaseOutlined style={{ fontSize: 24, color: '#faad14' }} />
            <Text>{nodeId}</Text>
          </div>
        ))}
      </div>

     

      <div className="tree-level pods">
  {Object.entries(clusterData).flatMap(([nodeId, groups]) =>
    Object.entries(groups).map(([groupName, pods]) => (
      <div key={`${nodeId}-${groupName}`} className="pod-column">
        <div className="tree-connect">
          <div className="arrow-down small" />
        </div>
        <div
          className="circle-card pod-group-card"
          onClick={() => handleGroupClick(groupName, pods)}
        >
          <Box size={20} />
          <Text>{groupName}</Text>
        </div>
      </div>
    ))
  )}
</div>


      <Modal
        title={modalInfo.groupName}
        visible={modalInfo.visible}
        onCancel={handleClose}
        footer={null}
      >
        <ul>
          {modalInfo.pods.map((pod, i) => (
            <li key={i}>{pod}</li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default ClusterDiagram;
