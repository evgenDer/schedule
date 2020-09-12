import React from 'react';
import { Button } from 'antd';

type TableHeaderProps = {
  hiddenRowsAmnt: number;
  onShowHiddenButtonClick: () => void;
};

const ShowHiddenButton: React.FC<TableHeaderProps> = ({ hiddenRowsAmnt, onShowHiddenButtonClick }) => {
  return (
    <React.Fragment>
      {hiddenRowsAmnt === 0 ? (
        <Button disabled={true}>There are no hidden rows</Button>
      ) : (
        <Button onClick={onShowHiddenButtonClick}>Show hidden rows ({hiddenRowsAmnt})</Button>
      )}
    </React.Fragment>
  );
};

export default ShowHiddenButton;
