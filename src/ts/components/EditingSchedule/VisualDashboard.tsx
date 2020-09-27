import React from 'react';
import { Button, Tag } from 'antd';
import { PlusCircleOutlined, RedoOutlined } from '@ant-design/icons';

const VisualDashboard = ({
  customizationTypeTask,
  taskTypeName,
  onReloadModal,
  onShowCreateTypeModal,
  disableItems,
}) => {
  return (
    <div
      style={{
        color: customizationTypeTask[taskTypeName].descriptionFontColor,
        background: customizationTypeTask[taskTypeName].descriptionBackgroundColor,
      }}
      className="preset-style-type"
    >
      <span>Some description</span>
      <Tag
        color={customizationTypeTask[taskTypeName].color}
        style={{ color: customizationTypeTask[taskTypeName].fontColor }}
      >
        {customizationTypeTask[taskTypeName].name}
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
