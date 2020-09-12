import React from 'react';
import { Button } from 'antd';

type EditTableButtonProps = {
  onEditButtonClick: () => void;
};

const EditTableButton: React.FC<EditTableButtonProps> = ({ onEditButtonClick }) => {
  return (
    <React.Fragment>
      <Button onClick={onEditButtonClick}>Edit table</Button>
    </React.Fragment>
  );
};

export default EditTableButton;
