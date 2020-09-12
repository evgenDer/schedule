import React, { useState } from 'react';
import StudentSheduleTable from './StudentSheduleTable';
import OrganizerSheduleTable from './OrganizerSheduleTable';
import { COMMON_COLS, STUDENT_COLS, ORGANIZER_COLS } from './tableColumns';
import { IData, TableDataColumns } from '../../constants/types-interfaces';

type SheduleTableProps = {
  dataSource: IData[];
  setData: (data: any) => void;
  userType?: boolean;
};

const SheduleTable: React.FC<SheduleTableProps> = ({ dataSource, setData, userType = false }) => {
  const additionalColumns = userType ? ORGANIZER_COLS : STUDENT_COLS;
  const columns = [...COMMON_COLS, ...additionalColumns];

  const [finalColumns, setFinalColumns] = useState<TableDataColumns>(columns);
  const [tableWidth] = useState(
    finalColumns.map((col) => col.width as number).reduce((accum, current) => accum + current)
  );

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
      {userType ? <OrganizerSheduleTable {...props} /> : <StudentSheduleTable {...props} />}
    </div>
  );
};

export default SheduleTable;
