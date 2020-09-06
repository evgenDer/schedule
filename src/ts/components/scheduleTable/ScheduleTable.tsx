import React from 'react';
import StudentSheduleTable from './StudentSheduleTable';
import OrganizerSheduleTable from './OrganizerSheduleTable';
import { COMMON_COLS, STUDENT_COLS, ORGANIZER_COLS } from './tableColumns';
import { IData, TableDataColumns } from '../../constants/types-interfaces';

type SheduleTableProps = {
  dataSource: IData[];
  userType?: boolean;
};

const SheduleTable: React.FC<SheduleTableProps> = ({ dataSource, userType = false }) => {
  const additionalColumns = userType ? ORGANIZER_COLS : STUDENT_COLS;
  const columns = [...COMMON_COLS, ...additionalColumns];

  return (
    <div className="shedule-table-container">
      {userType && <OrganizerSheduleTable dataSource={dataSource} columns={columns} />}
      {!userType && <StudentSheduleTable dataSource={dataSource} columns={columns} />}
    </div>
  );
};

export default SheduleTable;
