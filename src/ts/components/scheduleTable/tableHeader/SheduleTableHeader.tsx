import React from 'react';
import { TableDataColumns, ITimeZone } from '../../../constants/types-interfaces';
import ColumnsSelector from './ColumnsSelector';
import EditTableButton from './EditTableButton';
import ShowHiddenButton from './ShowHiddenButton';
import TimeZoneSelector from './TimeZoneSelector';

type TableHeaderProps = {
  userType?: boolean;
  hiddenRowsAmnt?: number;
  onShowHiddenButtonClick?: () => void;
  columns: TableDataColumns;
  finalColumns: TableDataColumns;
  setFinalColumns: (columns: TableDataColumns) => void;
  onEditButtonClick?: () => void;
  timezone: ITimeZone;
  setTimezone: (timezone: ITimeZone) => void;
};

const SheduleTableHeader: React.FC<TableHeaderProps> = ({
  userType = false,
  hiddenRowsAmnt,
  onShowHiddenButtonClick,
  columns,
  finalColumns,
  setFinalColumns,
  onEditButtonClick,
  timezone,
  setTimezone,
}) => {
  const emptyFunction = function () {};

  return (
    <React.Fragment>
      <div className="shedule-table__header">
        <div className="shedule-table__left">
          <TimeZoneSelector timezone={timezone} setTimezone={setTimezone} />
        </div>
        <div className="shedule-table__right">
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
      </div>
    </React.Fragment>
  );
};

export default SheduleTableHeader;
