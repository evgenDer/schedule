import React from 'react';
import { Table } from 'antd';

type OrganizerSheduleTableProps = {
  dataSource: object[];
  columns: object[];
};

const OrganizerSheduleTable: React.FC<OrganizerSheduleTableProps> = ({ dataSource, columns }) => {
  return (
    <React.Fragment>
      <Table dataSource={dataSource} columns={columns} />
    </React.Fragment>
  );
};

export default OrganizerSheduleTable;
