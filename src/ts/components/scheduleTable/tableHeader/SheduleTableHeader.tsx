import React from 'react';
import { TableDataColumns, ITimeZone } from '../../../constants/types-interfaces';
import ColumnsSelector from './ColumnsSelector';
import EditTableButton from './EditTableButton';
import ShowHiddenButton from './ShowHiddenButton';

type TableHeaderProps = {
  userType?: boolean;
  hiddenRowsAmnt?: number;
  onShowHiddenButtonClick?: () => void;
  selectedRowsAmnt?: number;
  onHideRowsButtonClick?: () => void;
  columns: TableDataColumns;
  finalColumns: TableDataColumns;
  setFinalColumns: (columns: TableDataColumns) => void;
  onEditButtonClick?: () => void;
  onSaveButtonClick?: () => void;
  isEditing?: boolean;
};

const SheduleTableHeader: React.FC<TableHeaderProps> = ({
  userType = false,
  hiddenRowsAmnt,
  onShowHiddenButtonClick,
  selectedRowsAmnt,
  onHideRowsButtonClick,
  columns,
  finalColumns,
  setFinalColumns,
  onEditButtonClick,
  onSaveButtonClick,
  isEditing = false,
}) => {
  const emptyFunction = () => {};

  return (
    <React.Fragment>
      <div className="shedule-table__header">
        <ColumnsSelector columns={columns} finalColumns={finalColumns} setFinalColumns={setFinalColumns} />
        {userType ? (
          <EditTableButton
            onEditButtonClick={onEditButtonClick || emptyFunction}
            onSaveButtonClick={onSaveButtonClick || emptyFunction}
            isEditing={isEditing}
          />
        ) : (
          <ShowHiddenButton
            hiddenRowsAmnt={hiddenRowsAmnt || 0}
            onShowHiddenButtonClick={onShowHiddenButtonClick || emptyFunction}
            selectedRowsAmnt={selectedRowsAmnt || 0}
            onHideRowsButtonClick={onHideRowsButtonClick || emptyFunction}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default SheduleTableHeader;
