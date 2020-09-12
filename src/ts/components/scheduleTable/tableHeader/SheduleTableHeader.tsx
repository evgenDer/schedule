import React from 'react';
import { TableDataColumns } from '../../../constants/types-interfaces';
import { Button } from 'antd';
import ColumnsSelector from './ColumnsSelector';
import EditTableButton from './EditTableButton';
import ShowHiddenButton from './ShowHiddenButton';

type TableHeaderProps = {
  userType?: boolean;
  hiddenRowsAmnt?: number;
  onShowHiddenButtonClick?: () => void;
  columns: TableDataColumns;
  finalColumns: TableDataColumns;
  setFinalColumns: (columns: TableDataColumns) => void;
  onEditButtonClick?: () => void;
};

const SheduleTableHeader: React.FC<TableHeaderProps> = ({
  userType = false,
  hiddenRowsAmnt,
  onShowHiddenButtonClick,
  columns,
  finalColumns,
  setFinalColumns,
  onEditButtonClick,
}) => {
  const emptyFunction = function () {};

  return (
    <React.Fragment>
      <div className="shedule-table__header">
        <ColumnsSelector columns={columns} finalColumns={finalColumns} setFinalColumns={setFinalColumns} />
        {userType ? (
          <EditTableButton onEditButtonClick={onEditButtonClick || emptyFunction} />
        ) : (
          <ShowHiddenButton
            hiddenRowsAmnt={hiddenRowsAmnt || 0}
            onShowHiddenButtonClick={onShowHiddenButtonClick || emptyFunction}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default SheduleTableHeader;
