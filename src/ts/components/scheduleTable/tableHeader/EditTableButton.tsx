import React from 'react';
import { Button } from 'antd';

type EditTableButtonProps = {
  onEditButtonClick: () => void;
  onSaveButtonClick: () => void;
  isEditing: boolean;
};

const EditTableButton: React.FC<EditTableButtonProps> = ({ onEditButtonClick, onSaveButtonClick, isEditing }) => {
  return isEditing ? (
    <Button type="primary" onClick={onSaveButtonClick}>
      Save table
    </Button>
  ) : (
    <Button onClick={onEditButtonClick}>Edit table</Button>
  );
};

export default EditTableButton;
