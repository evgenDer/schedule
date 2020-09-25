import React from 'react';
import { Button } from 'antd';

type TableHeaderProps = {
  hiddenRowsAmnt: number;
  onShowHiddenButtonClick: () => void;
  selectedRowsAmnt: number;
  onHideRowsButtonClick: () => void;
};

const ShowHiddenButton: React.FC<TableHeaderProps> = ({
  hiddenRowsAmnt,
  onShowHiddenButtonClick,
  selectedRowsAmnt,
  onHideRowsButtonClick,
}) => {
  let button: JSX.Element = <></>;

  if (selectedRowsAmnt) {
    button = (
      <Button onClick={onHideRowsButtonClick} type="primary">
        Hide selected rows
      </Button>
    );
  } else {
    button = hiddenRowsAmnt ? (
      <Button onClick={onShowHiddenButtonClick}>Show hidden rows ({hiddenRowsAmnt})</Button>
    ) : (
      <Button onClick={onHideRowsButtonClick} type="primary">
        Hide selected rows
      </Button>
    );
  }

  return button;
};

export default ShowHiddenButton;
