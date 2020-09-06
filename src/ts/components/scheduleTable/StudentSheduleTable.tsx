import React from 'react';
import { Table } from 'antd';
import { IData, TableDataColumns } from '../../constants/types-interfaces';
// import VirtualTable from './VirtualTable';

type StudentSheduleTableProps = {
  dataSource: IData[];
  columns: TableDataColumns;
};

const StudentSheduleTable: React.FC<StudentSheduleTableProps> = ({ dataSource, columns }) => {
  return (
    <React.Fragment>
      {/* <VirtualTable dataSource={dataSource} columns={columns} scroll={{ x: 1600, y: 300 }} /> */}
      <Table<IData> dataSource={dataSource} columns={columns} scroll={{ x: 1600 }} sticky />
    </React.Fragment>
  );
};

export default StudentSheduleTable;
