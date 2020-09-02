import React from 'react';
import { Table } from 'antd';

type StudentSheduleTableProps = {
  dataSource: object[];
  columns: object[];
};

const StudentSheduleTable: React.FC<StudentSheduleTableProps> = ({ dataSource, columns }) => {
  return (
    <React.Fragment>
      <Table dataSource={dataSource} columns={columns} />
    </React.Fragment>
  );
};

export default StudentSheduleTable;
