import React from 'react';
import { Button, Tag } from 'antd';
import { PlusCircleOutlined, RedoOutlined } from '@ant-design/icons';

const VisualDashboard = ({ customizationTypeTask, onReloadModal, onShowCreateTypeModal, disableItems }) => {
  return (
    <div
      style={{
        color: customizationTypeTask.descriptionFontColor,
        background: customizationTypeTask.descriptionBackgroundColor,
      }}
      className="preset-style-type"
    >
      <span>Some description</span>
      <Tag color={customizationTypeTask.color} style={{ color: customizationTypeTask.fontColor }}>
        {customizationTypeTask.name}
      </Tag>
      <Button onClick={() => onReloadModal(true)} icon={<RedoOutlined />} size="small" type="primary">
        Reset
      </Button>
      <Button
        onClick={() => onShowCreateTypeModal()}
        icon={<PlusCircleOutlined />}
        disabled={disableItems}
        size="small"
        type="primary"
      >
        Add type
      </Button>
    </div>
  );
};

export default VisualDashboard;
