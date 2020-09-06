import React from 'react';
import { Table } from 'antd';
import { IData, TableDataColumns } from '../../constants/types-interfaces';

type OrganizerSheduleTableProps = {
  dataSource: IData[];
  columns: TableDataColumns;
};

const OrganizerSheduleTable: React.FC<OrganizerSheduleTableProps> = ({ dataSource, columns }) => {
  return (
    <React.Fragment>
      <Table<IData> dataSource={dataSource} columns={columns} scroll={{ x: 1600 }} sticky />
    </React.Fragment>
  );
};

export default OrganizerSheduleTable;
