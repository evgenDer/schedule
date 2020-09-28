import React, { useEffect, useState } from 'react';
import StudentSheduleTable from './StudentSheduleTable';
import OrganizerSheduleTable from './OrganizerSheduleTable';
import { COMMON_COLS, STUDENT_COLS, ORGANIZER_COLS } from './tableColumns';
import { IData, TableDataColumns, ITimeZone, ITaskType } from '../../constants/types-interfaces';
import { calculateColumnsWidthSum } from '../../helpers/dataHelper';

type SheduleTableProps = {
  dataSource: IData[];
  setData: (data: any) => void;
  userType?: boolean;
  timezone: ITimeZone;
  setTimezone: (timezone: ITimeZone) => void;
  updateTableData: (newTableDta: IData[]) => void;
};

const SheduleTable: React.FC<SheduleTableProps> = ({
  dataSource,
  setData,
  userType = false,
  timezone,
  updateTableData,
}) => {
  const additionalColumns = userType ? ORGANIZER_COLS : STUDENT_COLS;
  const columns = [...COMMON_COLS, ...additionalColumns];

  const [finalColumns, setFinalColumns] = useState<TableDataColumns>(columns);
  const [tableWidth, setTableWidth] = useState(calculateColumnsWidthSum(finalColumns));

  useEffect(() => {
    setTableWidth(calculateColumnsWidthSum(finalColumns));
  }, [finalColumns]);

  const props = {
    data: dataSource,
    setData,
    columns,
    finalColumns,
    setFinalColumns,
    scroll: { x: tableWidth },
  };

  return (
    <div className="shedule-table-container">
      {userType ? (
        <OrganizerSheduleTable {...props} timezone={timezone} updateTableData={updateTableData} />
      ) : (
        <StudentSheduleTable {...props} />
      )}
    </div>
  );
};

export default SheduleTable;
